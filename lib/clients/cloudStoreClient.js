/**
 * Cloud store Client
 * Version 1.0.1
 */
const Datastore = require('@google-cloud/datastore');
const path = require('path');

class CloudStoreClient {
  constructor() {
    const aryaProjectId = 'arya-189513';
    this.aryaCloudStore = new Datastore({
      projectId: aryaProjectId,
      keyFilename: path.join(__dirname, '../filekeys/production/Arya-4e9a57f571fc.json')
    });
  }

  async storeEntity({kind, uid, data, excludeFromIndexes = []}) {
    const keyParams = [kind];
    if (uid) keyParams.push(uid);
    const entityKey = this.aryaCloudStore.key(keyParams);
    // Prepares the new entity
    const newEntity = {
      key: entityKey,
      excludeFromIndexes: [...excludeFromIndexes],
      data: {
        sts: Date.now(),
        ...data
      },
    };
    try {
      await this.aryaCloudStore.save(newEntity);
      console.log(`Saved ${uid} - ${newEntity.key.uid}: ${newEntity.data.description}`);
      return newEntity.key.uid;
    } catch (e) {
      console.error('ERROR: in saving to cloud datastore: ', e);
      throw e;
    }
  }

  async getEntityWithKey({kind, id}) {
    const datastore = this.aryaCloudStore;
    const datastoreKey = datastore.key([kind, id]);
    const entity = await datastore.get(datastoreKey);
    console.log('entitty: ', entity);
    return entity;
  }

  async getEntity({kind, filters}) {
    const datastore = this.aryaCloudStore;
    let query = datastore.createQuery(kind);
    filters.forEach(item => {
      query = query.filter(item[0], item[1]);
    });

    const entities = (await datastore.runQuery(query))[0];
    const firstEntity = entities[0];
    console.log('first entity: ', firstEntity);
    return entities;
  }


  async updateEntity({kind, id, newEntity}) {
    const datastore = this.aryaCloudStore;
    const transaction = this.aryaCloudStore.transaction();

    const tnx = (await transaction.run())[0];
    const key = datastore.key([kind, id]);
    const entity = (await tnx.get(key))[0];
    console.log('random entity: ', JSON.stringify(entity));
    tnx.save({
      key,
      excludeFromIndexes: ['payload'],
      data: {...entity, ...newEntity}
    });
    await tnx.commit();
    return {msg: 'done'};
  }

}


let instance;

function getInstance() {
  if (!instance) instance = new CloudStoreClient();
  return instance;
}

// instance = getInstance();
// storing with uid
// instance.storeEntity({kind: Constants.DataStoreEntities.DIET_CHART, uid: 'fajayagarwal_1535951130003', data: {sent: 1}});

// fetching with filters.
// instance.getEntity({kind: 'FCMMessages', filters: [['sts', 1528437916646]]}).then(() => {
//   console.log('All done!');
// });

// fetching with key
// const response = await cloudStoreClient.getEntityWithKey({kind: Constants.DataStoreEntities.DIET_CHART, id: prescriptionId});
// instance.getEntityWithKey({kind: 'FCMMessages', id: 5649391675244544}).then(() => {
//   console.log('All done!');
// });

// updating with uid/id
// instance.updateEntity({kind: 'FCMMessages', id: 5649391675244544, newEntity: {name: 'vijay simha reddy'}}).then(() => {
//   console.log('All done!');
// });

// instance.testing();

exports.getInstance = getInstance;

/**
 * Created by vijay on 29/12/14.
 */

const mongoose = require('mongoose');
const {mongoConfig} = require('config');
// const _ = require('lodash');
// const moment = require('moment');
// const promisify = require("es6-promisify");
const fn = require('../common-utils/functions');

// const ObjectId = mongoose.Types.ObjectId;
// const Constants = require('../Constants');

const replicaSetString = (mongoConfig.hasReplicaSet ? `/?replicaSet=${mongoConfig.rsName}` : "");
const connection = mongoose.createConnection(`mongodb://${mongoConfig.hosts}${replicaSetString}`, {ignoreUndefined: true});

connection.on('error', (err) => {
  console.log("something is wrong : ", err);
});

connection.on('open', () => {
  console.log("successfully connected to mongodb: ");
});

const medtrailDB = connection.useDb(mongoConfig.database);
const prescriptionDB = connection.useDb(mongoConfig.pDatabase);

const MUrlSchema = mongoose.Schema({}, {strict: false});
const MOpenSchema = mongoose.Schema({}, {strict: false});

// communicationDB

// Entity Models
const MUrlDataModel = medtrailDB.model('m_data_2', MUrlSchema, 'm_data_2');
// const MUrlDataModel = medtrailDB.model('m_data_1', MUrlSchema, 'm_data_1');
const ContactsDataModel = medtrailDB.model('contacts', MUrlSchema, 'contacts');
const NewContactsDataModel = medtrailDB.model('contacts_new', MUrlSchema, 'contacts_new');
const PrescriptionsModel = prescriptionDB.model('prescription_data', MOpenSchema, 'prescription_data');
const DigitizationModel = prescriptionDB.model('digitization_data', MOpenSchema, 'digitization_data');
const PrescriptionChangesModel = prescriptionDB.model('prescription_changes', MOpenSchema, 'prescription_changes');
const AccuracyResultsModel = prescriptionDB.model('accuracy_results', MOpenSchema, 'accuracy_results');
const AppUsageDataModel = medtrailDB.model('app_data', MUrlSchema, 'app_data');
const ReminderModel = medtrailDB.model('notification_data', MOpenSchema, 'notification_data');

class MedTrailBaseRepo {
  /**
   *
   * @param model
   * the model the repo should be working on.
   */
  constructor(model) {
    this.model = model;
  }

  create(params) {
    return this.model.create(params);
  }

  findItem({query, projection = {}}) {
    return this.model.findOne(query, projection)
      .then(result => result && JSON.parse(JSON.stringify(result)));
  }

  findStream({query, projection}) {
    return this.model.find(query, projection).cursor();
  }

  getQueryStream(query) {
    return this.model.find(query).cursor();
  }

  updatePlain({query, update, options}) {
    return this.model.findOneAndUpdate(query, update, {new: true, ...options})
      .then(result => result && JSON.parse(JSON.stringify(result)));
  }

  updateReminderStatus(query, update, options) {
    return this.model.findByIdAndUpdate(query, update, {new: true, ...options})
      .then(result => result && JSON.parse(JSON.stringify(result)));
  }

  updateWithOptions({query, update, options}) {
    return this.model.update(query, update, {...options});
  }

  findNextReminder() {
    // return this.model.find({time: {$gt: Date.now()}})
    return this.model.find({triggered: false})
      .sort({time: 1}).limit(1)
      .then(result => result && JSON.parse(JSON.stringify(result)));
  }

  aggregation(aggregationPipeline) {
    return this.model.aggregate(aggregationPipeline).then(result => result && JSON.parse(JSON.stringify(result)));
  }


}

class MUrlDataRepo {
  constructor(model) {
    this.model = model;
  }

  create(params) {
    return this.model.create(params);
  }

  find({query, projection}) {
    return this.model.find(query, projection);
  }

  findStream() {
    return this.model.find({crawled: true}, {'url': 1}).cursor();
  }

  getWithId(id) {
    return fn.defer(this.model.find, this.model)({'data.result.sku.id': id});
  }

  updateData({query, update, options = {}}) {
    return this.model.findOneAndUpdate(query, update, {new: true, ...options})
      .then(result => result && JSON.parse(JSON.stringify(result)));
  }

  updateCrawledData({query, update}) {
    return fn.defer(this.model.update, this.model)(query, update);
  }

  getUncrawledUrls(params) {
    const limit = params.limit || 10;
    const main = this.model.find(params.findParams).limit(limit);
    return fn.defer(main.exec, main)();
  }
}


class ContactsDataRepo extends MedTrailBaseRepo {
  create(params) {
    return this.model.create(params)
  }

  async getContactsDoctors() {
    const main = this.model.distinct('doctorId');
    return fn.defer(main.exec, main)();
  }
}

class AppUsageDataRepo extends MedTrailBaseRepo {
  create(params) {
    return this.model.create(params)
  }

  remove(filter) {
    return this.model.remove(filter)
  }

  // async getContactsDoctors() {
  //   const main = this.model.distinct('doctorId');
  //   return fn.defer(main.exec, main)();
  // }
}

class PrescriptionsRepo extends MedTrailBaseRepo {

}

class PrescriptionChangesRepo extends MedTrailBaseRepo {

}

class ReminderRepo extends MedTrailBaseRepo {

}

class AccuracyResultsRepo extends MedTrailBaseRepo {

}

class DigitizationRepo extends MedTrailBaseRepo {

}

mongoose.set('debug', true);// todo:enable this to see mongodb debugs
mongoose.Promise = global.Promise;


const mUrlDataRepo = new MUrlDataRepo(MUrlDataModel);

const oldContactsDataRepo = new ContactsDataRepo(ContactsDataModel);
const contactsDataRepo = new ContactsDataRepo(NewContactsDataModel);
const mPrescriptionsRepo = new PrescriptionsRepo(PrescriptionsModel);
const appUsageDataRepo = new AppUsageDataRepo(AppUsageDataModel);
const mPrescriptionChangesRepo = new PrescriptionChangesRepo(PrescriptionChangesModel);
const mAccuracyResultsRepo = new AccuracyResultsRepo(AccuracyResultsModel);
const mRemainderRepo = new ReminderRepo(ReminderModel);
const mDigitizationRepo = new DigitizationRepo(DigitizationModel);

exports.mUrlDataRepo = mUrlDataRepo;
exports.oldContactsDataRepo = oldContactsDataRepo;
exports.contactsDataRepo = contactsDataRepo;
exports.mPrescriptionsRepo = mPrescriptionsRepo;
exports.mPrescriptionChangesRepo = mPrescriptionChangesRepo;
exports.mAccuracyResultsRepo = mAccuracyResultsRepo;
exports.appUsageDataRepo = appUsageDataRepo;
exports.mReminderRepo = mRemainderRepo;
exports.mDigitizationRepo = mDigitizationRepo;

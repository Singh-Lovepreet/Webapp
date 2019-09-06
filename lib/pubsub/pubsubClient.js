/* eslint-disable no-underscore-dangle */
const {PubSub} = require(`@google-cloud/pubsub`);
const path = require('path');
const Constants = require('../Constants');
const Utils = require('../helpers/utils').getInstance();
const processDetails = require('../common-utils/process_details');

// constants
const LOCAL_CONSTANTS = {
  PUBSUB_TOPICS: {
    GLOBAL_EVENTS: 'global-events',
  },
  GLOBAL_EVENTS_TYPES: {
    SUBSCRIBER_STARTED: 'sub_start',
  },
};

// Creates a client


/**
 * TODO(developer): Uncomment the following lines to run the sample.
 */


class PubSubClient {
  constructor() {
    this.pubsub = new PubSub({
      projectId: Constants.gcpProjects.aryaProjectId,
      keyFilename: path.join(__dirname, '../filekeys/production/Arya-8a643a153cc8.json')
    });
  }

  /**
   * Publishes to given topicName with data & attrs.
   * @param topicName
   * @param data
   * @param attrs
   * @returns {Promise<*>}
   */
  async publish({topicName, data, attrs}) {
    const dataString = JSON.stringify(data);
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(dataString);

    try {
      const messageId = await this.pubsub
        .topic(topicName)
        .publisher()
        .publish(dataBuffer, attrs);
      console.log(`Message ${messageId} published.`);
      return {messageId};
    } catch (e) {
      console.log('something went wrong in publishing', e);
      return {msg: 'some went wrong'}
    }
  }

  /**
   * Starts subscription with given name.
   * @param subscriptionName
   * @returns {*}
   */
  subscription({subscriptionName}) {
    if (!subscriptionName) {
      return {msg: 'no prescription name'};
    }
    // References an existing subscription
    const subscription = this.pubsub.subscription(subscriptionName, {flowControl: {maxMessages: 1}});

    try {
      this.updateToGlobalTopic({subscriptionName});
    } catch (e) {
      console.log('got error when updating to global topic.');
    }

    return subscription;
  }

  /**
   * Update service details to global topic.
   * @param data
   * @returns {Promise<void>}
   */
  async updateToGlobalTopic(data) {
    data.processDetails = processDetails.getBasicDetails();
    const dataToSend = await Utils._zipDigitizedData({data});
    const topicName = LOCAL_CONSTANTS.PUBSUB_TOPICS.GLOBAL_EVENTS;
    const pubsubDataValues = {
      mType: LOCAL_CONSTANTS.GLOBAL_EVENTS_TYPES.SUBSCRIBER_STARTED,
      data: dataToSend
    };
    try {
      const response = await this.publish({topicName, data: pubsubDataValues});
      console.log('successfully pushed to global flow topic: ', response, data.subscriptionName);
    } catch (e) {
      console.log('cannot push to pub sub');
    }
  }


}


let instance;

function getInstance() {
  if (!instance) instance = new PubSubClient();
  return instance;
}

exports.getInstance = getInstance;

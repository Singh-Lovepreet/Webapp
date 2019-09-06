/* eslint-disable class-methods-use-this */

const pubsubClient = require('../pubsub/pubsubClient').getInstance();

const Constants = require('../Constants');

const HODOR_BOX_ID = 'WB0007';
const HODOR_DOCTOR_ID = 'hodor';
const HODOR_PID = 'hodor_messages_ext';


let instance;
class WaMessageHelper {

  /**
   * Sends a text message to the phone number through whatsapp
   * @param textMsg
   * @param waMType
   * @param phone
   * @param isGroup
   * @returns {Promise<void>}
   */
  async sendMessage({textMsg, waMType, phone, isGroup}) {
    const topicName = Constants.PUBSUB_TOPICS.GLOBAL_EVENTS;
    const attrs = {mType: Constants.GLOBAL_EVENTS_TYPES.SEND_WA_MESSAGE};
    const pubsubData = {
      dId: HODOR_BOX_ID,
      pId: HODOR_PID,
      doctorId: HODOR_DOCTOR_ID,
      phone,
      textMsg,
      isGroup,
      waMType: waMType || 'none'
    };

    console.log(JSON.stringify({topicName, data: pubsubData, attrs}));

    await pubsubClient.publish({topicName, data: pubsubData, attrs});
  }

  /**
   * publishes the raw content received from the pubsub
   * @param waData
   * @returns {Promise<void>}
   */
  async sendRawMessageDirectly({waData}) {
    await pubsubClient.publish({...waData});
  }


  static getInstance() {
    if(!instance) instance = new WaMessageHelper();
    return instance;
  }
}


exports.getInstance = WaMessageHelper.getInstance;


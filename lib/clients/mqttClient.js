/* eslint-disable no-console,no-param-reassign */
const mqtt = require('mqtt');
// const moment = require('moment-timezone');
const Constants = require('../Constants')

let instance = null;

class MqttClient {
  constructor() {
    this.getClient();
  }

  async getClient() {
    if (this.client) {
      return this.client;
    }

    this.client = mqtt.connect(Constants.MQTT_CONNECTION_PARAMS.BROKER_URL, {
      port: Constants.MQTT_CONNECTION_PARAMS.PORT,
      clientId: Constants.MQTT_CONNECTION_PARAMS.CLIENT_ID,
      username: Constants.MQTT_CONNECTION_PARAMS.USERNAME,
      password: Constants.MQTT_CONNECTION_PARAMS.PASSWORD,
      clean: Constants.MQTT_CONNECTION_PARAMS.CLEAN_SESSION,
      will: Constants.MQTT_CONNECTION_PARAMS.WILL_MESSAGE
    });
    this.client.on('connect', () => {
      console.log("Successfully connected to Mqtt Broker with ClientId:", Constants.MQTT_CONNECTION_PARAMS.CLIENT_ID);
    });
    return this.client;
  }

  async publish({topicName, qos, retain, data}) {
    const client = await this.getClient();
    // const dataString = JSON.stringify(data);
    const dataBuffer = Buffer.from(data);
    try {
      await client.publish(topicName, dataBuffer, {qos, retain});
    } catch (e) {
      console.log(`Error in Mqtt publish process: ${e}`);
    }
  }

  async subscribe({topicName, qos, callback = null}) {
    const client = await this.getClient();
    try {
      await client.subscribe(topicName, {qos}, callback);
    } catch (e) {
      console.log(`Error in Mqtt subscribe process: ${e}`);
    }
  }

  async onMessageReceived(callback) {
    const client = await this.getClient();
    client.on('message', (topic, message, packet,ack) => {
      console.log(`Received message ${packet.messageId}:`);
      console.log(`\tData: ${packet.payload}`);
      packet.payload = JSON.parse(message.toString());
      callback({topic,packet,ack})
    })
  }

  static getInstance() {
    if (!instance) {
      instance = new MqttClient();
    }
    return instance;
  }
}

exports.getInstance = MqttClient.getInstance;


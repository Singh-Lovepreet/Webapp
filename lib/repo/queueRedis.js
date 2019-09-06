'use strict';

const redis = require('redis');
const fn = require('../common-utils/functions');
const moment = require('moment');
const Config = require('config');
const redisConfig = Config.queueRedisConfig;

const client = redis.createClient({host: redisConfig.host, port: redisConfig.port});
client.on('error', (err)=> {
  console.error('error in connecting to queue redis : ', err);
});

class BaseQueue {
  constructor(client, name) {
    this.client = client;
    this.setname = name;
  }

  addDataToQueue(data) {
    let newData = data;
    if(typeof data !== 'string') {
      newData = JSON.stringify(data);
    }
    return fn.defer(this.client.lpush, this.client)(this.setname, newData);
  }

  getLastElementFromQueueActual() {
    return fn.defer(this.client.rpop, this.client)(this.setname);
  }

  getLastElementFromQueue() {
    return fn.defer(this.client.lrange, this.client)([this.setname, 0, 0]);
  }
}

class NewPrescriptionQueue extends BaseQueue {
  constructor(client, name) {
    super(client, name);
  }
}

class WaMessagingQueue extends BaseQueue {
  constructor(client, name) { super(client, name); }
}

const newPrescriptionQueue = new NewPrescriptionQueue(client, "new_prescription");

function getMessagingQueue({doctorId}) {
  return new WaMessagingQueue(client, 'wa_message_queue_' + doctorId);
}

const Repos = {
  getMessagingQueue: getMessagingQueue
};

module.exports = Repos;
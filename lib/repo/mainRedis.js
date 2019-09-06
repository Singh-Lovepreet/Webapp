'use strict';

const redis = require('redis');
const fn = require('../common-utils/functions');
const moment = require('moment');
const Config = require('config');
const redisConfig = Config.mainRedisConfig;

const client = redis.createClient({host: redisConfig.host, port: redisConfig.port});
client.on('error', (err)=> {
  console.error('error in connecting to queue redis : ', err);
});


class DoctorBoardConnectionStatus {
  constructor(client, name) {
    this.client = client;
    this.hashsetName = name;
  }

  async setStatus(doctorId, status) {
    return this.client.hset([this.hashsetName, doctorId, status]);
  }

  async getStatus(doctorId) {
    const response = await fn.defer(this.client.hget, this.client)([this.hashsetName, doctorId]);
    console.log('response: ', response);
    return response;
  }

  async getAllStatuses() {
    return await fn.defer(this.client.hgetall, this.client)([this.hashsetName]);
  }

}

class OpenKey {
  constructor({client}) {
    this.client = client;
  }
  async set({key, value}) {
    return this.client.set([key, value]);
  }

  async get({key}) {
    const response = await fn.defer(this.client.get, this.client)(key);
    console.log('key reponse', response);
    return response;
  }
}

const doctorBoardConnectionStatus = new DoctorBoardConnectionStatus(client, "c_status");
const openKey = new OpenKey({client});

const Repos = {
  doctorBoardConnectionStatus,
  openKey
};

module.exports = Repos;

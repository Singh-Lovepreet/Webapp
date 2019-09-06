'use strict';
const fn = require('../common-utils/functions');
const underscore = require('underscore');
const httpClient = require('../clients/httpclient.js').getInstance();
const slackClient = require('../clients/slackClient').getInstance();
const mongoRepos = require('../repo/mongodb_repos');
const moment = require('moment-timezone');
const CONFIG = require('config');
const _ = require('lodash');
const Constants = require('../Constants');
const fcmClient = require('../clients/FCMClient').getInstance();
const pushyClient = require('../clients/PushyClient').getInstance();
const firebaseAdminClient = require('../clients/firebaseAdminClient').getInstance();

const zlib = require('zlib');

const Utils = require('../helpers/utils').getInstance();


class FCMActionHelper {

  async updateClinicDetailsForDoctor({doctorId, doctorDetails, clinics, direct}) {
    await mongoRepos.mDoctorRepo.updateClinicDetailsWithDoctorId({doctorId, clinics});

    const dataTobeSent = this._generatePayloadForUpdateClinic({clinics});

    const payload = dataTobeSent.payload;
    let newPayload;
    if(payload) {
      const payloadBuffer = Buffer.from(JSON.stringify(payload), 'utf8');
      const finalPayload = (await fn.defer(zlib.gzip, zlib)(payloadBuffer));
      newPayload = Buffer.from(finalPayload).toString('base64')
    }

    dataTobeSent.payload = newPayload;

    const fcmToken = doctorDetails.fcmToken;
    dataTobeSent.dId = doctorId;
    let response;
    if(direct === 1) {
      response = await fcmClient.sendMessage({data: dataTobeSent, token: fcmToken});
    }else {
      response = await fcmClient.sendMessageNew({data: dataTobeSent, token: fcmToken});
    }

    console.log('response from gcm client: ', response);

    return response;

  }

  async updateClinicDetailsForHub({hubDetails}) {
    const hubId = hubDetails.hubId;
    const clinics = hubDetails.clinics;
    await mongoRepos.mDoctorRepo.updateClinicDetailsWithHubId({hubId, clinics});

    const dataTobeSent = this._generatePayloadForUpdateClinic({clinics});

    const payload = dataTobeSent.payload;
    let newPayload;
    if(payload) {
      const payloadBuffer = Buffer.from(JSON.stringify(payload), 'utf8');
      const finalPayload = (await fn.defer(zlib.gzip, zlib)(payloadBuffer));
      newPayload = Buffer.from(finalPayload).toString('base64')
    }

    dataTobeSent.payload = newPayload;

    const fcmToken = hubDetails.fcmToken;
    dataTobeSent.dId = hubId;
    let response;
    response = await fcmClient.sendMessage({data: dataTobeSent, token: fcmToken});

    console.log('response from gcm client: ', response);

    return response;

  }


  _generatePayloadForUpdateClinic({clinics}) {
    return {
      "t": "uc",
      "payload": {
        clinics
      }
    }
  }


}


let instance;
function getInstance() {
  if(!instance) instance = new FCMActionHelper();
  return instance;
}

exports.getInstance = getInstance;

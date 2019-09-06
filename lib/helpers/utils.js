const fs = require('fs');
const lodash = require('lodash');
const fn = require('../common-utils/functions');
const zlib = require('zlib');
const Constants = require('../Constants');

class Utils {
  constructor() {

  }

  getDoctorIdFromPrescriptionId(prescriptionId) {
    const items = prescriptionId.split('_');
    items.pop();
    const doctorId = items.join('_');
    return doctorId;
  }

  getTimestampFromPrescriptionId({prescriptionId}) {
    const items = prescriptionId.split('_');
    const timestamp = items.pop();
    return timestamp;
  }

  async _zipDigitizedData({data}) {
    try {
      const payloadBuffer = Buffer.from(JSON.stringify(data), 'utf8');
      const finalPayload = (await fn.defer(zlib.gzip, zlib)(payloadBuffer));
      const newPayload = Buffer.from(finalPayload).toString('base64');
      return newPayload;
    } catch (e) {
      console.log('not able to create zip', e);
    }
  }

  i_fixUrl(url) {
    url = url.replace("http://localhost:7007", Constants.serverUrl);
    url = url.replace("0.png", '0-final.png');
    return url;
  }

  async _unzipDigitizedData({data}) {
    try {
      const payloadBuffer = Buffer.from(data, 'base64');
      const finalPayload = (await fn.defer(zlib.unzip, zlib)(payloadBuffer));
      const newPayload = Buffer.from(finalPayload).toString('utf-8');
      const digitizedData = JSON.parse(newPayload);
      return digitizedData;
    } catch (e) {
      console.log('error: ', e);
    }
  }

  getAgeRange({age}) {
    if(age == null) return 'NA';
    let ageRange;
    switch (parseInt(age/10)) {
      case 0:
        ageRange = '0-10';
        break;
      case 1:
        ageRange = '10-20';
        break;
      case 2:
        ageRange = '20-30';
        break;
      case 3:
        ageRange = '30-40';
        break;
      case 4:
        ageRange = '40-50';
        break;
      case 5:
        ageRange = '50-60';
        break;
      case 6:
        ageRange = '60-70';
        break;
      case 7:
        ageRange = '70-80';
        break;
      case 8:
        ageRange = '80-90';
        break;
      case 9:
        ageRange = '90-100';
        break;
      default:
        ageRange = 'NA+';
        break;
    }
    return ageRange;
  }

  getGender({gender}) {
    if(gender == 1) return 'male';
    if(gender == 2) return 'female';
    return 'na';
  }

  sanitizeNumber(no) {
    return no.replace(/[^\d]/g, '')
  }

}





let instance;
function getInstance() {
  if(!instance) instance = new Utils();
  return instance;
}

exports.getInstance = getInstance;

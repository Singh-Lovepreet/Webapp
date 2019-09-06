// const fn = require('../common-utils/functions');
// const underscore = require('underscore');
// const httpClient = require('../clients/httpclient.js').getInstance();
// const mongoRepos = require('../repo/mongodb_repos');
// const moment = require('moment-timezone');
// const CONFIG = require('config');
// const _ = require('lodash');
// const Constants = require('../Constants');
//
// const zlib = require('zlib');
//
// const Utils = require('../helpers/utils').getInstance();
//
// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
//
class WebAPI {

  async randomTesting(params) {
    console.log('params: ', params);
    return {msg: 'done'};
  }


}

let instance;
function getInstance() {
  if(!instance) instance = new WebAPI();
  return instance;
}

exports.getInstance = getInstance;

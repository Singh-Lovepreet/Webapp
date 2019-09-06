/* eslint-disable class-methods-use-this,no-underscore-dangle */
const _ = require('lodash');
const Config = require('config');
const elasticsearch = require('elasticsearch');
const Constants = require('../../lib/Constants');
const moment = require('moment-timezone');

// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

class ElasticSearchClient {
  constructor() {
    this.client = new elasticsearch.Client({
      hosts: Config.esHosts,
      // log: 'trace'
    });
  }

  /**
   * Search in the index for given query and returns the response.
   * @param query
   * @returns {Promise<void>}
   */
  async getQueryResults({query}) {
    const queryParams = {
      index: Constants.ELASTICSEARCH.PRESCRIPTIONS_INDEX,
      type: Constants.ELASTICSEARCH.PRESCRIPTIONS_TYPE,
      body: query,
    };
    const response = await this.client.search(queryParams);
    return response;
  }

  async getDoctorAppCount({query}) {
    const queryParams = {
      index: Constants.ELASTICSEARCH.ANALYTICS_V3_INDEX,
      type: Constants.ELASTICSEARCH.EVENTS,
      body: query,
    };
    const response = await this.client.search(queryParams);
    return response;
  }

  async getWaDoneCount({query}) {
    const queryParams = {
      index: Constants.ELASTICSEARCH.WA_ANALYTICS,
      type: Constants.ELASTICSEARCH.EVENTS,
      body: query,
    };
    const response = await this.client.search(queryParams);
    return response;
  }
}


let instance;

function getInstance() {
  if (!instance) instance = new ElasticSearchClient();
  return instance;
}

exports.getInstance = getInstance;

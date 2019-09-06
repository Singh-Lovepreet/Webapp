/* eslint-disable no-underscore-dangle */
/**
 * Created by vijay on 25/04/15.
 */
const express = require('express');

const router = express.Router();

// var momentDurationFormatSetup = require("moment-duration-format");
// const deferred = require('../lib/common-utils/deferred');
const fn = require('../lib/common-utils/functions');
const {callAPI} = require('../lib/common-utils/router_functions');
const webAPI = require('../lib/apis/webAPI').getInstance();
// const crawl = require('../scripts/onemg/crawler').crawl
// const crawlBatch = require('../scripts/onemg/crawl_page').crawlBatch

/* GET home page. */

// const CONFIG = require('config');
// const httpClient = require('../lib/clients/httpclient.js').getInstance();
// const cronInstance = require('../crons/index').getInstance();
// cronInstance.startCrons(['monthlyAnalyticsNotif','dailyAnalyticsNotif','weeklyAnalyticsNotif']);


// const elasticsearchClient = require('../lib/clients/elasticsearchClient.js').getInstance();

/**
 * Web APIS
 */

router.get('/v1/testing', (req, res) => {
  callAPI(req, res, fn.bind(webAPI, 'randomTesting'));
});


module.exports = router;

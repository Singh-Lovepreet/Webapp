/* eslint-disable no-underscore-dangle,camelcase */
/**
 * Created by vijay on 25/04/15.
 */
const express = require('express');

const router = express.Router();

// var momentDurationFormatSetup = require("moment-duration-format");
// const deferred = require('../lib/common-utils/deferred');
const fn = require('../lib/common-utils/functions');
const {callAPI} = require('../lib/common-utils/router_functions');
const techSmithAPI = require('../lib/apis/techsmithAPI').getInstance();

/* GET home page. */


/**
 * Web APIS
 */

const TECH_SMITH_KEY = 'random-stuff';
router.use('/v1', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey || apiKey !== TECH_SMITH_KEY) {
    return res.status(401).send({auth: false, message: 'No token provided.'});
  }
  return next();
});
router.post('/v1/medicinesale', (req, res) => {
  callAPI(req, res, fn.bind(techSmithAPI, 'saveMedicineSaleData'));
});

module.exports = router;

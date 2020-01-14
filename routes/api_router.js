/* eslint-disable no-underscore-dangle */
/**
 * Created by vijay on 25/04/15.
 */
const express = require('express');

const router = express.Router();
const fn = require('../lib/common-utils/functions');
const {callAPI} = require('../lib/common-utils/router_functions');
const webAPI = require('../lib/apis/webAPI').getInstance();

router.get('/v1/testing', (req, res) => {
  callAPI(req, res, fn.bind(webAPI, 'randomTesting'));
});

router.post('/v1/getDataById', (req, res) => {
  callAPI(req, res, fn.bind(webAPI, 'findDocById'));
});

router.post('/v1/insertDataInDb', (req, res) => {
  callAPI(req, res, fn.bind(webAPI, 'insertDataInDb'));
});

router.post('/v1/updateDataInDb', (req, res) => {
  callAPI(req, res, fn.bind(webAPI, 'updateDoc'));
});
module.exports = router;

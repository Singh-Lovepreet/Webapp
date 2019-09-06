const express = require('express');

const router = express.Router();

const fn = require('../lib/common-utils/functions');
const {callAPI} = require('../lib/common-utils/router_functions');


/* GET home page. */
router.get('/', (req, res) => {
  console.logger.error("this is error");
  console.logger.info("this is just an info");
  console.logger.debug("this is a debug statement");
  res.render('index', {title: 'MedTrail'});
});

router.get('/health-check', (req, res) => {
  res.status(200).send({msg: "everything is cool!"});
});

router.get('/R1Q43D8J', (req, res) => {
  res.render('feedback', {title: 'MedTrail', message: 'Vijay'})
});

module.exports = router;

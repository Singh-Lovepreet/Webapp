/*jshint globalstrict: true*/
/*global require: true, exports: true */
'use strict';
const os = require('os');
const ip = require("ip");

function getBasicDetails() {
  const {USER, PWD} = process.env;
  try {
    const data = {
      pid: process.pid,
      ppid: process.ppid,
      user: USER,
      host: os.hostname(),
      pwd: PWD,
      ip: ip.address()
    };
    return data;
  } catch (e) {
    console.log('error', e);
    return {user: 'cannot find! something went wrong!'};
  }
}


module.exports = {
  getBasicDetails
};

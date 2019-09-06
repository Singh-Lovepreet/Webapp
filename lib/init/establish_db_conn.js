var Sequelize = require('sequelize');
var seqCfg = require('config').dbConfig;
var sequelize = new Sequelize(seqCfg.database, seqCfg.username, seqCfg.password, seqCfg.options);

exports.sequelize = sequelize;

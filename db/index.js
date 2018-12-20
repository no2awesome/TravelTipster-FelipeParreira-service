const Sequelize = require('sequelize');

const db = new Sequelize('qa', 'root', 'mysqlPassword', {
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,
  host: 'localhost',
});

module.exports = db;

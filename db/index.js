const Sequelize = require('sequelize');
const { username, password } = require('./config');

const db = new Sequelize('qa', username, password, {
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,
  host: 'localhost',
});

module.exports = db;

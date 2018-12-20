const Sequelize = require('sequelize');

const db = new Sequelize('qa', 'root', 'mysqlPassword');

module.exports = db;

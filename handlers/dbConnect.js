const { Sequelize } = require('sequelize');
const logger = require('./logger');
const sequelize = new Sequelize("rexor",  process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mariadb',
    host: 'localhost',
    logging: false,
  });

module.exports = sequelize;
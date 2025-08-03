require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(DB_NAME || 'postgres', 'postgres', DB_PASS || '1554', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
const sequelize = require('../db');
const { User, Task } = require('./associations'); // витягуємо вже з’єднані моделі

module.exports = {
  sequelize,
  User,
  Task,
};
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
}, {
  tableName: 'tasks',
  freezeTableName: true,
});

module.exports = task;
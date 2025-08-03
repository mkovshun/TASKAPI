const { DataTypes} = require('sequelize');
const sequelize = require("../db");

const user = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.CHAR(50),
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.CHAR(50),
    allowNull: false,
    field: 'last_name'
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
{
  tableName: 'users',
  freezeTableName: true,
  timestamps: false,
});

module.exports = user;
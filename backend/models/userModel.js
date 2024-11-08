// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: { 
    type: DataTypes.STRING,
    defaultValue: 'user',
  }
}, {
  freezeTableName: true, // Esto evitará que Sequelize pluralice el nombre de la tabla
  tableName: 'users' // Asegura que el nombre de la tabla sea exactamente 'users'
});

// Método para validar la contraseña
User.prototype.validatePassword = function (password) {
  return password === this.password;
};

module.exports = User;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./postModel');
const Venta = require('./ventaModel');

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
});

// Asociaciones
User.hasMany(Post, { foreignKey: 'usuarioId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

User.hasMany(Venta, { foreignKey: 'usuarioId', as: 'ventas' });
Venta.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuarioVenta' });

module.exports = User;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./postModel'); // Asegúrate de requerir el modelo de Post
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
    defaultValue: 'user', // 'user' por defecto y 'admin' para administradores
  }
});

// Definir la asociación aquí
User.hasMany(Post, { foreignKey: 'usuarioId', as: 'posts' });
User.hasMany(Venta, { foreignKey: 'usuarioId', as: 'ventas' });

User.prototype.validatePassword = async function (password) {
  return password === this.password;
};

module.exports = User;

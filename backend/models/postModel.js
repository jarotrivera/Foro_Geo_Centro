const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Post = sequelize.define('Post', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.TEXT('long'), 
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// Asociación con User ya definida en userModel.js
module.exports = Post;

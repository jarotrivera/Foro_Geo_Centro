// models/postModel.js
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
}, {
  freezeTableName: true, // Evita que Sequelize cambie el nombre de la tabla
  tableName: 'Posts', // Asegúrate de que coincida con la tabla en tu base de datos
});

Post.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = Post;

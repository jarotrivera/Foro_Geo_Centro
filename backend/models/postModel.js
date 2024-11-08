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
  tableName: 'Post', // Asegúrate de usar el nombre correcto de la tabla
  freezeTableName: true,
});

Post.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = Post;

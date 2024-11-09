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
      model: 'Users', // Asegúrate de que coincida con el nombre de la tabla
      key: 'id',
    },
  },
}, {
  freezeTableName: true,
  tableName: 'Posts',
});

// Asegúrate de que la asociación esté definida después de la definición del modelo.
setImmediate(() => {
  const User = require('./userModel');
  Post.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });
});

module.exports = Post;

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel'); // Importar el modelo User

class Venta extends Model {}

Venta.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  foto: {
    type: DataTypes.TEXT('long'),
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Venta',
});

module.exports = Venta;

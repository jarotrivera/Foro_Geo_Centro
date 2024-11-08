const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel'); // Importa el modelo User

// Definir el modelo Venta
const Venta = sequelize.define('Venta', {
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
      model: 'Users', // Importante: usa el nombre correcto de la tabla
      key: 'id',
    },
  },
});

// Definir las asociaciones
User.hasMany(Venta, { foreignKey: 'usuarioId', as: 'ventas' });
Venta.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuarioVenta' });

module.exports = Venta;

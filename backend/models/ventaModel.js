const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel'); // Asegúrate de que el modelo User esté correctamente importado

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
      model: User,
      key: 'id',
    },
  },
});

// Configurar la asociación con el modelo User
Venta.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuarioVenta' });
User.hasMany(Venta, { foreignKey: 'usuarioId', as: 'ventas' });

module.exports = Venta;

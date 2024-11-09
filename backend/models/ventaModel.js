const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel'); // Asegúrate de importar el modelo User

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
}, {
  freezeTableName: true,
  tableName: 'Venta' // Asegúrate de que coincida con el nombre de tu tabla en la base de datos
});

// Definir la asociación después de importar User
Venta.belongsTo(User, { foreignKey: 'usuarioId', as: 'VentaUser' });

module.exports = Venta;

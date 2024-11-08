const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Venta = require('./ventaModel'); // Importar el modelo Venta

class User extends Model {}

User.init({
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
  },
}, {
  sequelize,
  modelName: 'User',
});

// Definir asociaciones después de cargar todos los modelos
User.hasMany(Venta, { foreignKey: 'usuarioId', as: 'ventas' });
Venta.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuarioVenta' });

User.prototype.validatePassword = async function (password) {
  return password === this.password;
};

module.exports = User;

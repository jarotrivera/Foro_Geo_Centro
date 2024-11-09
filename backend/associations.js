// associations.js
const User = require('./models/userModel');
const Post = require('./models/postModel');
const Venta = require('./models/ventaModel');

// Definir asociaciones
User.hasMany(Post, { foreignKey: 'usuarioId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

User.hasMany(Venta, { foreignKey: 'usuarioId', as: 'ventas' });
Venta.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = { User, Post, Venta };

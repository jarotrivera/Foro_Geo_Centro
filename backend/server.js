// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const adminRoutes = require('./routes/adminRoutes');
const gastosRoutes = require('./routes/gastosRoutes');
const parkingRoutes = require('./routes/parkingRoutes');

// Importar modelos para sincronizar las asociaciones
const User = require('./models/userModel');
const Post = require('./models/postModel');
const Venta = require('./models/ventaModel');

// Configurar las asociaciones entre los modelos
User.hasMany(Post, { foreignKey: 'usuarioId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

User.hasMany(Venta, { foreignKey: 'usuarioId', as: 'ventas' });
Venta.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuarioVenta' });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/parking', parkingRoutes);

// Sincroniza la base de datos y levanta el servidor
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Conexión a la base de datos exitosa');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('Error al conectar con la base de datos:', error);
});

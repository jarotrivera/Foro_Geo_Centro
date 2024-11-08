const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const adminRoutes = require('./routes/adminRoutes');
const gastosRoutes = require('./routes/gastosRoutes');
const parkingRoutes = require('./routes/parkingRoutes');

// Importar modelos
const User = require('./models/userModel');
const Post = require('./models/postModel');
const Venta = require('./models/ventaModel');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/parking', parkingRoutes);

// Servir archivos estáticos del frontend
const frontendPath = path.join(__dirname, '../dist');
app.use(express.static(frontendPath));

// Ruta para manejar todas las demás solicitudes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Sincronizar la base de datos y arrancar el servidor
const PORT = process.env.PORT || 8080;
sequelize.sync().then(() => {
  console.log('Conexión a la base de datos exitosa');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('Error al conectar con la base de datos:', error);
});

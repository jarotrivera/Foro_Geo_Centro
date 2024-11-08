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

const app = express();

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

// Ruta base para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.status(200).send('Servidor funcionando correctamente');
});

// Forzamos a que use siempre el puerto 3000
const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

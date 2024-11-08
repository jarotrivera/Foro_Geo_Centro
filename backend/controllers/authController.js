// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Controlador para el registro
const register = async (req, res) => {
  const { nombre, email, password, departamento } = req.body;
  if (!nombre || !email || !password || !departamento) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const newUser = await User.create({ nombre, email, password, departamento });
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Controlador para el login
const login = async (req, res) => {
  const { nombre, password } = req.body;
  try {
    const user = await User.findOne({ where: { nombre } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isPasswordValid = user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Incluir el rol en la respuesta
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ message: 'Error en el proceso de login' });
  }
};


module.exports = { register, login };

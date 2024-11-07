// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    console.log('Intento de login:', { nombre, password });
    const user = await User.findOne({ where: { nombre } });
    console.log('Usuario encontrado:', user ? user.nombre : 'No encontrado');

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas: usuario no encontrado' });
    }

    const isPasswordValid = await user.validatePassword(password);
    console.log('Contraseña válida:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas: contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ message: 'Error en el proceso de login', error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: ['id', 'nombre', 'email', 'role'] });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ id: user.id, nombre: user.nombre, email: user.email, role: user.role });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario', error });
  }
};

module.exports = { login, getUserProfile };

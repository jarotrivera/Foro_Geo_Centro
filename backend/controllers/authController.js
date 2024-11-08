const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Función para registrar un usuario
const register = async (req, res) => {
  try {
    const { nombre, email, password, departamento } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { nombre } });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({
      nombre,
      email,
      password,
      departamento,
      role: 'user', // Asigna el rol por defecto como 'user'
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error en el proceso de registro:', error);
    res.status(500).json({ message: 'Error en el proceso de registro', error });
  }
};

// Función para iniciar sesión
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

// Función para obtener el perfil del usuario
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

module.exports = { register, login, getUserProfile };

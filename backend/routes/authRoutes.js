// routes/authRoutes.js
const express = require('express');
const { login, register } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateUser, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;

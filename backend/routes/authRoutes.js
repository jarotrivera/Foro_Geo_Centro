// routes/authRoutes.js
const express = require('express');
const { login, getUserProfile } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.get('/profile', authenticateUser, getUserProfile);

module.exports = router;

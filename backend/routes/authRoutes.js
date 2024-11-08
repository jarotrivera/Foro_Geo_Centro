const express = require('express');
const { login, register, getUserProfile } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateUser, getUserProfile);

module.exports = router;

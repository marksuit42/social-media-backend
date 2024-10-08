const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/auth'); // Import the JWT verification middleware
//const verifyToken = require('./middleware/authMiddleware');

// Public route: user login
router.post('/login', authController.login);

// Public route: forgot password
router.put('/forgot-password', authController.forgotPassword);

// Protected route: get current user
router.get('/current-user', verifyToken, authController.getCurrentUser);

router.post('/register', authController.register);



// Protected route: user profile
router.get('/home', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to the Home Page', user: req.user });
  });

  router.get('/validate-token', verifyToken, (req, res) => {
    // If the token is valid, middleware will pass, and this will be returned
    res.status(200).json({ valid: true, user: req.user });
  });

module.exports = router;

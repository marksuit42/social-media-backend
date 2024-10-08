const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const verifyToken = require('../../middleware/auth'); // Import the JWT verification middleware

// Route to send a message
router.post('/', verifyToken, sendMessage); // Apply the middleware

// Route to get messages for a specific recipient
router.get('/:recipientEmail', verifyToken, getMessages); // Apply the middleware

module.exports = router;
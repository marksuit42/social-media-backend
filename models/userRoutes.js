const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/search', userController.searchUsersByEmail);

module.exports = router;
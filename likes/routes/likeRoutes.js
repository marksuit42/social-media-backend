// likeRoutes.js
const express = require('express');
const likeController = require('../controllers/likeController');
const verifyToken = require('../../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, likeController.addLike);
router.delete('/', verifyToken,  likeController.removeLike);

module.exports = router;
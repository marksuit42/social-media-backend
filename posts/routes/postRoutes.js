const express = require('express');
const { createPost, deletePost, getPostById, getAllPosts, updatePost, uploadMedia } = require('../controllers/postController');
const verifyToken = require('../../middleware/auth');

const router = express.Router();

// Create a post
router.post('/', verifyToken, createPost);


// Other routes
router.delete('/:postId', verifyToken, deletePost);
router.get('/:postId', getPostById);
router.get('/', verifyToken, getAllPosts);
router.put('/:postId', verifyToken, updatePost);

module.exports = router;


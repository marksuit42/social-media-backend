const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../../middleware/auth');

// Route to add a comment to a post
router.post('/:postId/comments', verifyToken, commentController.addComment);

// Route to get comments for a post
router.get('/:postId/comments', verifyToken, commentController.getComments);

// Route to like a comment
router.post('/:commentId/like', verifyToken, commentController.likeComment);

// Route to update a comment
router.put('/:commentId', verifyToken, commentController.updateCommentById);

// Route to delete a comment
router.delete('/:commentId', verifyToken, commentController.deleteCommentById);

module.exports = router;
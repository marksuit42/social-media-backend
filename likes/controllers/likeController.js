// likeController.js
const likeRepository = require('../repositories/likeRepository');

// Add a like
async function addLike(req, res) {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        const like = await likeRepository.addLike(userId, postId);
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Remove a like
async function removeLike(req, res) {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        const like = await likeRepository.removeLike(userId, postId);
        res.status(200).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addLike,
    removeLike,
};
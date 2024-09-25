// likeRepository.js
const Like = require('../models/like');

// Add a like
async function addLike(userId, postId) {
  const existingLike = await Like.findOne({ user: userId, post: postId });
  if (existingLike) {
    throw new Error('Like already exists');
  }
  const like = new Like({ user: userId, post: postId });
  await like.save();
  return like;
}

// Remove a like
async function removeLike(userId, postId) {
  const like = await Like.findOne({ user: userId, post: postId });
  if (!like) {
    throw new Error('Like not found');
  }
  await Like.deleteOne({ _id: like._id });
  return like;
}

// Count likes by post ID
async function countLikesByPostId(postId) {
  return await Like.countDocuments({ post: postId });
}

// Check if user has liked a post
async function userHasLikedPost(userId, postId) {
  const like = await Like.findOne({ user: userId, post: postId });
  return !!like;
}

 async function deleteLikesByPostId  (postId) {
  try {
    await Like.deleteMany({ post: postId });
  } catch (error) {
    console.error('Error deleting likes by post ID:', error);
    throw error;
  }
};

module.exports = {
  addLike,
  removeLike,
  countLikesByPostId,
  userHasLikedPost,
  deleteLikesByPostId
};
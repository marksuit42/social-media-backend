const Post = require('../models/post');
const Comment = require('../../comments/models/comment');

// Create a post
exports.createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

// Delete a post by ID
exports.deletePost = async (postId) => {
  await Comment.deleteMany({ post: postId });
  return await Post.findByIdAndDelete(postId);
};

// Get all posts with population of the author field
exports.getAllPosts = () => {
  return Post.find().populate('author', 'email');
};

// Get a particular post by ID with population of the author field
exports.getPostById = (postId) => {
  return Post.findById(postId).populate('author', 'email');
};

// Update a post by ID
exports.updatePost = (postId, updateData) => {
  return Post.findByIdAndUpdate(postId, updateData, { new: true }).populate('author', 'email');
};

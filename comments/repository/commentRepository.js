const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Post = require('../../posts/models/post');

const addCommentToPost = async (postId, content, author) => {
  const comment = new Comment({ content, author, post: postId });
  await comment.save();

  const post = await Post.findById(postId);
  post.comments.push(comment._id);
  await post.save();

  return comment;
};

const getCommentsForPost = async (postId) => {
  const post = await Post.findById(postId).populate('comments');
  return post.comments;
};

const updateComment = async (commentId, content) => {
 const comment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
  return comment;
};

const deleteComment = async (commentId) => {
  const comment = await Comment.findByIdAndDelete(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }

  const post = await Post.findById(comment.post);
  post.comments.pull(comment._id);
  await post.save();

  return comment;
};

const likeCommentById = async (commentId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (!comment.likes) {
    comment.likes = [];
  }
  if (!comment.likes.includes(userId)) {
    comment.likes.push(userId);
    comment.likeCount += 1;
  }else {
    comment.likes.pull(userId);
    comment.likeCount -= 1;
  }
  await comment.save();
  return comment;
};

module.exports = {
  addCommentToPost,
  getCommentsForPost,
  updateComment,
  deleteComment,
  likeCommentById,
};
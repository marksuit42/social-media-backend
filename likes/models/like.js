const mongoose = require('mongoose');

// Define Like Schema
const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: null,  // Can be null if it's a like on a comment
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,  // Can be null if it's a like on a post
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

// Create Like model from schema
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;

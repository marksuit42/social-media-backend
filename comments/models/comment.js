const mongoose = require('mongoose');

// Define Comment Schema
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 280,  // Character limit for comments
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',  // Reference to the post this comment belongs to
    default: null,  // Can be null if it's a reply to another comment
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',  // Reference to parent comment for nested comments
    default: null,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Array of users who liked the comment
    default: [],
  }],
  likeCount: {
    type: Number,
    default: 0,  // Count of likes
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  }
}, { timestamps: true });

// Ensure a comment is either on a post or another comment, but not both
commentSchema.pre('save', function (next) {
  if (!this.post && !this.parentComment) {
    return next(new Error('Comment must be associated with a post or another comment.'));
  }
  next();
});

// Create Comment model from schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

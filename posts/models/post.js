const mongoose = require('mongoose');
const validator = require('validator');

// Define Post Schema
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 500,  // Character limit for posts
  },
  mediaUrl: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),  // Validate that media URL is valid
      message: 'Invalid media URL',
    },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Array of users who liked the post
  }],
  likesCount: {
    type: Number,
    default: 0,
  },
  userHasLiked: {
    type: Boolean,
    default: false,
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',  // Array of comments on the post
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  }
}, { timestamps: true });

// Middleware to update likeCount before saving
postSchema.pre('save', function(next) {
  this.likeCount = this.likes.length;
  next();
});

// Create Post model from schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

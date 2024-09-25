const mongoose = require('mongoose');

// Define Follow Schema
const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // User who is following another user
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // User who is being followed
  },
  accepted: {
    type: Boolean,
    default: false,  // Indicates whether the follow request has been accepted
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

// Create Follow model from schema
const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
const Follow = require('../models/follow');
const User = require('../../models/User');

// Send a follow request
// Send a follow request
exports.sendFollowRequest = async (req, res) => {
    const { userId } = req.body;
    const followerId = req.user.id;
  
    try {
      // Check if a follow request already exists
      const existingRequest = await Follow.findOne({ follower: followerId, following: userId });
      if (existingRequest) {
        return res.status(400).json({ message: 'Follow request already sent' });
      }
  
      // Check if a follow relationship already exists
      const existingFollow = await Follow.findOne({ follower: followerId, following: userId, accepted: true });
      if (existingFollow) {
        return res.status(400).json({ message: 'Already following this user' });
      }
  
      const follow = new Follow({ follower: followerId, following: userId });
      await follow.save();
      return res.status(201).json({ message: 'Follow request sent successfully' });
    } catch (error) {
      console.error('Error sending follow request:', error);
      return res.status(500).json({ message: 'Error sending follow request', error });
    }
  };

// Get follow requests
exports.getFollowRequests = async (req, res) => {
  const userId = req.user.id;

  try {
    const followRequests = await Follow.find({ following: userId, accepted: false }).populate('follower');
    return res.status(200).json(followRequests);
  } catch (error) {
    console.error('Error fetching follow requests:', error);
    return res.status(500).json({ message: 'Error fetching follow requests', error });
  }
};

// Accept a follow request
exports.acceptFollowRequest = async (req, res) => {
    const { followId } = req.params;
  
    try {
      // Find the follow request
      const followRequest = await Follow.findById(followId);
      if (!followRequest) {
        return res.status(404).json({ message: 'Follow request not found' });
      }
  
      // Check if a follow relationship already exists
      const existingFollow = await Follow.findOne({ follower: followRequest.follower, following: followRequest.following, accepted: true });
      if (existingFollow) {
        return res.status(400).json({ message: 'Already following this user' });
      }
  
      // Update the follow request to accepted
      followRequest.accepted = true;
      await followRequest.save();
  
      return res.status(200).json({ message: 'Follow request accepted' });
    } catch (error) {
      console.error('Error accepting follow request:', error);
      return res.status(500).json({ message: 'Error accepting follow request', error });
    }
  };
// Decline a follow request
exports.declineFollowRequest = async (req, res) => {
  const { followId } = req.params;

  try {
    await Follow.findByIdAndDelete(followId);
    return res.status(200).json({ message: 'Follow request declined' });
  } catch (error) {
    console.error('Error declining follow request:', error);
    return res.status(500).json({ message: 'Error declining follow request', error });
  }
};

// Get the list of users the current user is following
exports.getFollowing = async (req, res) => {
  const userId = req.user.id;

  try {
    const following = await Follow.find({ follower: userId, accepted: true }).populate('following');
    return res.status(200).json(following.map(f => f.following));
  } catch (error) {
    console.error('Error fetching following list:', error);
    return res.status(500).json({ message: 'Error fetching following list', error });
  }
};
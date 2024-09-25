const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const verifyToken = require('../../middleware/auth');

router.post('/send', verifyToken, followController.sendFollowRequest);
router.get('/requests',verifyToken , followController.getFollowRequests);
router.post('/accept/:followId', verifyToken, followController.acceptFollowRequest);
router.post('/decline/:followId', verifyToken ,followController.declineFollowRequest);

// Route to get the list of users the current user is following
router.get('/following', verifyToken, followController.getFollowing);

module.exports = router;
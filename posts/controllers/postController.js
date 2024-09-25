const postRepository = require('../repository/postRepository');
const likeRepository = require('../../likes/repositories/likeRepository');


// Create a post
exports.createPost = async (req, res) => {
  try {
    const { content, media, tags } = req.body;
    const userId = req.user.id;

    if (!content || !userId) {
      return res.status(400).json({
        message: 'Content and author are required',
      });
    }

    const newPost = await postRepository.createPost({
      content,
      mediaUrl: media, // Ensure to use mediaUrl to match schema
      tags,
      author: userId,
    });

    const populatedPost = await postRepository.getPostById(newPost._id); // Populate within repository

    return res.status(201).json({
      message: 'Post created successfully',
      post: populatedPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({
      message: 'Error creating post',
      error: error.message || error,
    });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  

  try {
    const post = await postRepository.getPostById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await likeRepository.deleteLikesByPostId(postId);

    await postRepository.deletePost(postId);
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Error deleting post', error });
  }
};


// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
  

    const posts = await postRepository.getAllPosts();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    const userId = req.user.id; // Ensure to use _id for user

    // Fetch likes count and whether the current user has liked each post
    const postsWithLikes = await Promise.all(posts.map(async (post) => {
     // console.log('Processing post:', post); // Add logging
      if (!post || !post._id) {
        throw new Error('Post object is undefined or does not have an _id property');
      }
      const likesCount = await likeRepository.countLikesByPostId(post._id);
      const userHasLiked = await likeRepository.userHasLikedPost(userId, post._id);
      return {
        ...post.toObject(),
        likesCount,
        userHasLiked,
      };
    }));

    return res.status(200).json(postsWithLikes);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return res.status(500).json({
      message: 'Error fetching posts',
      error: error.message,
    });
  }
};



// Get a post by ID
exports.getPostById = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    // Fetch the list of users the current user follows
    const following = await Follow.find({ follower: userId, accepted: true }).select('following');
    const followedUserIds = following.map(f => f.following.toString());

    // Fetch the post
    const post = await postRepository.getPostById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post author is in the list of followed users
    if (!followedUserIds.includes(post.author._id.toString())) {
      return res.status(403).json({ message: 'Not authorized to view this post' });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({
      message: 'Error fetching post',
      error: error.message || error,
    });
  }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { content, mediaUrl } = req.body;

  try {
    const post = await postRepository.getPostById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const updatedPost = await postRepository.updatePost(postId, {
      content,
      mediaUrl,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating post', error });
  }
};

const mongoose = require('mongoose');
const User = require('../models/User');  // Adjust the path to where your models are
const Post = require('../posts/models/post');
const Comment = require('../comments/models/comment');
const Like = require('../likes/models/like');
const Follow = require('../follows/models/follow');

const bcrypt = require('bcrypt');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/your-db-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Like.deleteMany({});
    await Follow.deleteMany({});

    console.log('Cleared existing data.');

    // Create users
    const users = [
      { email: 'john@example.com', password: await bcrypt.hash('password1', 10) },
      { email: 'jane@example.com', password: await bcrypt.hash('password2', 10) },
      { email: 'alice@example.com', password: await bcrypt.hash('password3', 10) }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Users created:', createdUsers);

    // Create posts
    const posts = [
      { content: 'This is my first post!', author: createdUsers[0]._id },
      { content: 'Loving this platform!', author: createdUsers[1]._id },
      { content: 'Just chilling...', author: createdUsers[2]._id }
    ];

    const createdPosts = await Post.insertMany(posts);
    console.log('Posts created:', createdPosts);

    // Create comments
    const comments = [
      { content: 'Great post!', author: createdUsers[1]._id, post: createdPosts[0]._id },
      { content: 'I agree!', author: createdUsers[2]._id, post: createdPosts[1]._id },
      { content: 'Nice work!', author: createdUsers[0]._id, post: createdPosts[2]._id }
    ];

    const createdComments = await Comment.insertMany(comments);
    console.log('Comments created:', createdComments);

    // Create likes
    const likes = [
      { user: createdUsers[0]._id, post: createdPosts[1]._id },
      { user: createdUsers[1]._id, post: createdPosts[2]._id },
      { user: createdUsers[2]._id, post: createdPosts[0]._id }
    ];

    await Like.insertMany(likes);
    console.log('Likes created.');

    // Create follows
    const follows = [
      { follower: createdUsers[0]._id, following: createdUsers[1]._id },
      { follower: createdUsers[1]._id, following: createdUsers[2]._id },
      { follower: createdUsers[2]._id, following: createdUsers[0]._id }
    ];

    await Follow.insertMany(follows);
    console.log('Follows created.');

    console.log('Database seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(seedData);

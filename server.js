const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./posts/routes/postRoutes');
const likeRoutes = require('./likes/routes/likeRoutes');
const userRoutes = require('./models/userRoutes'); // Import user routes
const followRoutes = require('./follows/routes/followRoutes'); // Import follow routes
const commentRoutes = require('./comments/routes/commentRoutes'); // Import comment routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors({
  origin: 'https://master--superlative-manatee-1170c9.netlify.app', // Allow requests from this origin (React app)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Add more methods as needed
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));
app.use(express.json()); // Parse JSON bodies

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', userRoutes); // Register user routes
app.use('/api/follows', followRoutes); // Register follow routes
app.use('/api/posts', commentRoutes); // Register comment routes under /api/posts
app.use('/api/comments', commentRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

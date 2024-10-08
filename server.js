const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // Import http
const { Server } = require('socket.io'); // Import socket.io
const authRoutes = require('./routes/auth');
const postRoutes = require('./posts/routes/postRoutes');
const likeRoutes = require('./likes/routes/likeRoutes');
const userRoutes = require('./models/userRoutes'); // Import user routes
const followRoutes = require('./follows/routes/followRoutes'); // Import follow routes
const commentRoutes = require('./comments/routes/commentRoutes'); // Import comment routes
const messageRoutes = require('./message/routes/messageRoutes'); // Import message routes

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin (React app)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Add more methods as needed
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  }
});
const PORT = process.env.PORT || 5000;

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

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', userRoutes); // Register user routes
app.use('/api/follows', followRoutes); // Register follow routes
app.use('/api/posts', commentRoutes); // Register comment routes under /api/posts
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes); // Register message routes

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

<<<<<<< HEAD
server.listen(PORT, () => {
=======


app.listen(PORT, () => {
>>>>>>> 7c95885bf2a6382cb0aa9c3522751e1dda3af043
  console.log(`Server is running on port ${PORT}`);
});

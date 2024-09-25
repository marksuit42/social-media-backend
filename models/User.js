const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Define User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function(password) {
        // Validate the plain text password before hashing
        return /^[a-zA-Z0-9]+$/.test(password);
      },
      message: 'Password must be alphanumeric and at least 6 characters long',
    },
  },
  followersCount: {
    type: Number,
    default: 0,  // Count of how many people are following the user
  },
  followingCount: {
    type: Number,
    default: 0,  // Count of how many people the user is following
  }
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    // Validate the plain text password before hashing
    if (!/^[a-zA-Z0-9]+$/.test(user.password)) {
      throw new Error('Password must be alphanumeric and at least 6 characters long');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to update the password
userSchema.methods.updatePassword = async function(newPassword) {
  // Validate the plain text password before hashing
  console.log('Updating password for user:', this.email);
  console.log('Updating password:', newPassword);
  if (!/^[a-zA-Z0-9]+$/.test(newPassword) || newPassword.length < 6) {
    throw new Error('Password must be alphanumeric and at least 6 characters long');
  }

  this.password = newPassword;
  await this.save();
};

// Create User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
const User = require('./User');

// Search users by email
exports.searchUsersByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const users = await User.find({ email: new RegExp(email, 'i') });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users by email:', error);
    return res.status(500).json({ message: 'Error searching users', error });
  }
};
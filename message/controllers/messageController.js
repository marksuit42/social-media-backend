const Message = require('../model/Message'); // Import the Message model

// Controller to send a message
exports.sendMessage = async (req, res) => {
  const { recipientEmail, content } = req.body;
  const senderEmail = req.user.email; // Assuming you have user info in req.user

  try {
    const message = new Message({
      senderEmail,
      recipientEmail,
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get messages for a specific recipient
exports.getMessages = async (req, res) => {
  const { recipientEmail } = req.params;
  const senderEmail = req.user.email; // Assuming you have user info in req.user

  try {
    const messages = await Message.find({
      $or: [
        { senderEmail, recipientEmail },
        { senderEmail: recipientEmail, recipientEmail: senderEmail },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
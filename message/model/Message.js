const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
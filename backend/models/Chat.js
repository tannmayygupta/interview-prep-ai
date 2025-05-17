// models/Chat.js
const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  userId: String,
  role: String,
  experience: String,
  topic: String,
  description: String,
  aiResponse: [
    {
      question: String,
      answer: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', ChatSchema);

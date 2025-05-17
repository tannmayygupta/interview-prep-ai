// controllers/chatController.js
const Chat = require('../models/Chat');

// Dummy Gemini response generator (replace with real Gemini API call)
const generateWithGemini = async ({ role, experience, topic, description }) => {
  return [
    {
      question: `What is ${topic} in context of ${role}?`,
      answer: `${topic} is essential for ${role} with ${experience} experience. (${description})`
    },
    {
      question: `Explain how ${topic} is applied practically.`,
      answer: `In practice, ${topic} involves problem-solving, technical understanding, and real-world use cases.`
    }
  ];
};

const createChat = async (req, res) => {
  const io = req.app.get('io');
  const { userId, role, experience, topic, description } = req.body;

  try {
    const aiResponse = await generateWithGemini({ role, experience, topic, description });

    const chat = await Chat.create({
      userId,
      role,
      experience,
      topic,
      description,
      aiResponse
    });

    io.emit('newChat', chat); // Emit real-time update to all clients
    res.status(201).json(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Failed to create chat session' });
  }
};

const getChats = async (req, res) => {
  const { userId } = req.query;
  try {
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat sessions' });
  }
};

module.exports = { createChat, getChats };

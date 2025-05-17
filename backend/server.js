// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use('/api/chats', chatRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('🟢 WebSocket client connected');
});

// Attach io to app for controllers to emit events
app.set('io', io);

// ✅ Make sure PORT is read from .env (not declared inside .env!)
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

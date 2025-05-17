// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { createChat, getChats } = require('../controllers/chatController');

router.post('/', createChat);
router.get('/', getChats);

module.exports = router;

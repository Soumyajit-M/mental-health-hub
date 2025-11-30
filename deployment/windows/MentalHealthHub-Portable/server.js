const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const aiService = require('./aiService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Track connected users and AI state
let connectedUsers = 0;
let aiEnabled = true; // AI is enabled by default

// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Simulated support resources
let resources = [
  { id: 1, title: 'Crisis Hotline', description: '24/7 support for mental health crises', contact: '1-800-HELP-NOW' },
  { id: 2, title: 'Online Therapy', description: 'Connect with licensed therapists online', link: 'https://example.com/therapy' },
  { id: 3, title: 'Support Groups', description: 'Join community support groups', link: 'https://example.com/groups' }
];

// Simulated chat messages
let chatMessages = [];

// Utility function to sanitize input
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().substring(0, 500); // Limit length and trim
}

// API endpoint to get resources
app.get('/api/resources', (req, res) => {
  try {
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// API endpoint to get chat messages
app.get('/api/chat', (req, res) => {
  try {
    res.json(chatMessages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Failed to fetch chat messages' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  connectedUsers++;
  console.log(`Client connected: ${socket.id} (Total: ${connectedUsers})`);
  
  // Broadcast user count to all clients
  io.emit('userCount', connectedUsers);

  // Send welcome message from AI
  setTimeout(async () => {
    try {
      const welcomeMessage = {
        text: "Hello! I'm your AI support assistant. I'm here to listen and provide guidance. How can I support you today?",
        isOwn: false,
        isAI: true,
        timestamp: new Date().toISOString()
      };
      socket.emit('aiMessage', welcomeMessage);
    } catch (error) {
      console.error('Error sending welcome message:', error);
    }
  }, 1000);

  socket.on('newMessage', async (message) => {
    try {
      // Validate and sanitize message
      if (!message || typeof message.text !== 'string') {
        console.error('Invalid message format');
        return;
      }

      const sanitizedMessage = {
        text: sanitizeInput(message.text),
        isOwn: Boolean(message.isOwn),
        timestamp: new Date().toISOString()
      };

      // Don't add empty messages
      if (sanitizedMessage.text.length === 0) {
        return;
      }

      chatMessages.push(sanitizedMessage);
      
      // Limit chat history to last 100 messages
      if (chatMessages.length > 100) {
        chatMessages = chatMessages.slice(-100);
      }

      io.emit('messageUpdate', chatMessages);
      console.log(`Message from ${socket.id}: ${sanitizedMessage.text.substring(0, 50)}...`);

      // Get AI response if enabled
      if (aiEnabled && message.isOwn) {
        // Emit typing indicator
        socket.emit('aiTyping', true);

        try {
          const aiResponse = await aiService.getAIResponse(sanitizedMessage.text);
          
          // Simulate natural delay
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
          
          socket.emit('aiTyping', false);

          if (aiResponse && aiResponse.response) {
            const aiMessage = {
              text: aiResponse.response,
              isOwn: false,
              isAI: true,
              isCrisis: aiResponse.isCrisis || false,
              timestamp: new Date().toISOString()
            };

            // Add AI message to history
            chatMessages.push(aiMessage);
            if (chatMessages.length > 100) {
              chatMessages = chatMessages.slice(-100);
            }

            // Send AI response
            socket.emit('aiMessage', aiMessage);
            io.emit('messageUpdate', chatMessages);

            console.log(`AI responded to ${socket.id}`);
          }
        } catch (error) {
          socket.emit('aiTyping', false);
          console.error('AI response error:', error);
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // Request resources
  socket.on('requestResources', () => {
    try {
      const resourcesResponse = aiService.getResources();
      socket.emit('aiMessage', {
        text: resourcesResponse.response,
        isOwn: false,
        isAI: true,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending resources:', error);
    }
  });

  // Typing indicator
  socket.on('typing', (isTyping) => {
    socket.broadcast.emit('userTyping', isTyping);
  });

  socket.on('disconnect', () => {
    connectedUsers--;
    console.log(`Client disconnected: ${socket.id} (Total: ${connectedUsers})`);
    io.emit('userCount', connectedUsers);
  });

  socket.on('error', (error) => {
    console.error(`Socket error from ${socket.id}:`, error);
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('\n=================================');
  console.log('🏥 Mental Health Hub Server');
  console.log('=================================');
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Access: http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Socket.IO ready for connections`);
  console.log('=================================\n');
});

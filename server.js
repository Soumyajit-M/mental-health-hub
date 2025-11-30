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

// Mental Health Support Resources - India & International
let resources = [
  // Emergency Crisis Helplines (India)
  { 
    id: 1, 
    title: 'Vandrevala Foundation Crisis Helpline', 
    description: '24/7 mental health crisis support in India - Free & Confidential', 
    contact: '1860-2662-345 or 1800-2333-330',
    category: 'Crisis Helpline'
  },
  { 
    id: 2, 
    title: 'KIRAN Mental Health Helpline', 
    description: '24/7 toll-free mental health rehabilitation helpline by Govt. of India', 
    contact: '1800-599-0019',
    category: 'Crisis Helpline'
  },
  { 
    id: 3, 
    title: 'iCall Psychosocial Helpline', 
    description: 'Email & telephone counseling service by TISS Mumbai (Mon-Sat, 8 AM - 10 PM)', 
    contact: '9152987821',
    link: 'https://icallhelpline.org',
    category: 'Crisis Helpline'
  },

  // Online Therapy Platforms (India)
  { 
    id: 4, 
    title: 'Practo Online Therapy', 
    description: 'Connect with 1000+ verified psychiatrists & psychologists online. Video/chat consultations available', 
    link: 'https://www.practo.com/consult/psychiatrist',
    category: 'Online Therapy'
  },
  { 
    id: 5, 
    title: 'BetterHelp India', 
    description: 'Professional online counseling - Match with licensed therapists in 24 hours. Chat, video, phone sessions', 
    link: 'https://www.betterhelp.com',
    category: 'Online Therapy'
  },
  { 
    id: 6, 
    title: 'Amaha (InnerHour)', 
    description: 'Evidence-based mental health care - Self-help tools, therapy, psychiatry consultation', 
    link: 'https://www.amahahealth.com',
    category: 'Online Therapy'
  },
  { 
    id: 7, 
    title: 'MindPeers', 
    description: 'Corporate & individual mental wellness platform - 300+ therapists, coaches & psychiatrists', 
    link: 'https://www.mindpeers.co',
    category: 'Online Therapy'
  },
  { 
    id: 8, 
    title: 'Wysa', 
    description: 'AI chatbot for mental health + human therapists. Available 24/7 for immediate support', 
    link: 'https://www.wysa.io',
    category: 'Online Therapy'
  },
  { 
    id: 9, 
    title: 'YourDOST', 
    description: 'India\'s largest emotional wellness platform - Chat, call, or video therapy with experts', 
    link: 'https://yourdost.com',
    category: 'Online Therapy'
  },

  // Top Mental Health Doctors/Hospitals (India)
  { 
    id: 10, 
    title: 'NIMHANS Bangalore', 
    description: 'National Institute of Mental Health & Neuro Sciences - India\'s premier mental health institution', 
    contact: '080-26995000',
    link: 'https://nimhans.ac.in',
    category: 'Top Hospitals'
  },
  { 
    id: 11, 
    title: 'AIIMS Psychiatry Department', 
    description: 'All India Institute of Medical Sciences Delhi - Renowned psychiatry & de-addiction services', 
    contact: '011-26588500',
    link: 'https://www.aiims.edu/en/departments/psychiatry.html',
    category: 'Top Hospitals'
  },
  { 
    id: 12, 
    title: 'Fortis Hospital Mental Health', 
    description: 'Leading multi-specialty hospital chain with expert psychiatrists across India', 
    link: 'https://www.fortishealthcare.com/specialities/psychiatry',
    category: 'Top Hospitals'
  },
  { 
    id: 13, 
    title: 'Apollo Hospitals Mind Clinic', 
    description: 'Comprehensive mental health services - Depression, anxiety, addiction treatment', 
    link: 'https://www.apollohospitals.com/departments/psychiatry',
    category: 'Top Hospitals'
  },
  { 
    id: 14, 
    title: 'Cadabams Hospitals', 
    description: 'Specialized psychiatric hospitals & rehabilitation centers across India (Since 1991)', 
    contact: '+91 97414 76476',
    link: 'https://cadabamshospitals.com',
    category: 'Top Hospitals'
  },

  // Support Groups & Communities
  { 
    id: 15, 
    title: 'The Mind Clan', 
    description: 'Online peer support community for mental health. Share experiences, join group sessions', 
    link: 'https://www.themindclan.com',
    category: 'Support Groups'
  },
  { 
    id: 16, 
    title: 'Mpower 1on1', 
    description: 'Free online support groups - Depression, anxiety, LGBTQ+, women\'s mental health', 
    link: 'https://mpowerminds.com',
    category: 'Support Groups'
  },
  { 
    id: 17, 
    title: 'White Swan Foundation', 
    description: 'Mental health awareness & support. Resources, stories, and community forums', 
    link: 'https://www.whiteswanfoundation.org',
    category: 'Support Groups'
  },

  // Self-Help Resources
  { 
    id: 18, 
    title: 'Mann Talks (Shantanu Lahiri)', 
    description: 'Leading mental health awareness platform & YouTube channel by top psychiatrist Dr. Shantanu Lahiri', 
    link: 'https://www.youtube.com/@MannTalks',
    category: 'Self-Help'
  },
  { 
    id: 19, 
    title: 'The Live Love Laugh Foundation', 
    description: 'Founded by Deepika Padukone - Mental health awareness, resources & support programs', 
    link: 'https://www.thelivelovelaughfoundation.org',
    category: 'Self-Help'
  },
  { 
    id: 20, 
    title: 'Healthy Mind India', 
    description: 'Free mental health resources, articles, and tools for Indian context', 
    link: 'https://healthymindindia.com',
    category: 'Self-Help'
  }
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

/**
 * Socket.IO Event Handlers
 * Real-time communication handlers
 */

const aiService = require('../services/aiService');
const logger = require('../utils/logger');
const { validateMessage } = require('../utils/sanitizer');
const constants = require('../config/constants');

class SocketHandlers {
  constructor(io) {
    this.io = io;
    this.messageHistory = [];
    this.activeUsers = new Set();
    this.typingUsers = new Map();
    this.maxHistorySize = 100;
  }

  /**
   * Initialize socket connection
   */
  handleConnection(socket) {
    const userId = socket.id;
    this.activeUsers.add(userId);
    
    logger.logConnection(userId, this.activeUsers.size);

    // Send welcome message
    socket.emit(constants.SOCKET_EVENTS.CHAT_MESSAGE, {
      user: 'System',
      message: 'Welcome to Mental Health Hub! You can chat here or visit the forum.',
      timestamp: new Date().toISOString(),
      isSystem: true
    });

    // Send message history
    socket.emit(constants.SOCKET_EVENTS.CHAT_HISTORY, this.messageHistory);

    // Update user count
    this.io.emit(constants.SOCKET_EVENTS.USER_COUNT, {
      count: this.activeUsers.size
    });

    // Set up event handlers
    this.setupEventHandlers(socket);
  }

  /**
   * Set up all event handlers for a socket
   */
  setupEventHandlers(socket) {
    socket.on(constants.SOCKET_EVENTS.CHAT_MESSAGE, (data) => 
      this.handleChatMessage(socket, data)
    );

    socket.on(constants.SOCKET_EVENTS.AI_MESSAGE, (data) => 
      this.handleAIMessage(socket, data)
    );

    socket.on(constants.SOCKET_EVENTS.TYPING, (data) => 
      this.handleTyping(socket, data)
    );

    socket.on(constants.SOCKET_EVENTS.STOP_TYPING, () => 
      this.handleStopTyping(socket)
    );

    socket.on(constants.SOCKET_EVENTS.FORUM_POST, (data) => 
      this.handleForumPost(socket, data)
    );

    socket.on('disconnect', () => 
      this.handleDisconnect(socket)
    );
  }

  /**
   * Handle chat messages
   */
  handleChatMessage(socket, data) {
    try {
      const validation = validateMessage(data.message);
      if (!validation.valid) {
        socket.emit('error', { message: validation.error });
        return;
      }

      const messageData = {
        user: data.user || 'Anonymous',
        message: validation.sanitized,
        timestamp: new Date().toISOString()
      };

      // Add to history
      this.addToHistory(messageData);

      // Broadcast to all clients
      this.io.emit(constants.SOCKET_EVENTS.CHAT_MESSAGE, messageData);

      logger.logMessage(messageData.user, messageData.message);

    } catch (error) {
      logger.error('Error handling chat message:', error.message);
      socket.emit('error', { message: 'Failed to send message' });
    }
  }

  /**
   * Handle AI messages
   */
  async handleAIMessage(socket, data) {
    try {
      const validation = validateMessage(data.message);
      if (!validation.valid) {
        socket.emit('error', { message: validation.error });
        return;
      }

      const userMessage = {
        user: data.user || 'Anonymous',
        message: validation.sanitized,
        timestamp: new Date().toISOString(),
        isAI: true
      };

      // Emit user message
      socket.emit(constants.SOCKET_EVENTS.AI_MESSAGE, userMessage);

      // Show AI is typing
      socket.emit(constants.SOCKET_EVENTS.AI_TYPING, { typing: true });

      // Get AI response
      const aiResponse = await aiService.getAIResponse(validation.sanitized);

      logger.logAIResponse(validation.sanitized, aiResponse.response, aiResponse.isCrisis);

      // Send AI response
      const aiMessageData = {
        user: 'AI Assistant',
        message: aiResponse.response,
        timestamp: new Date().toISOString(),
        isAI: true,
        isCrisis: aiResponse.isCrisis
      };

      setTimeout(() => {
        socket.emit(constants.SOCKET_EVENTS.AI_TYPING, { typing: false });
        socket.emit(constants.SOCKET_EVENTS.AI_MESSAGE, aiMessageData);

        // If crisis, send resources
        if (aiResponse.isCrisis) {
          const resources = aiService.getResources();
          setTimeout(() => {
            socket.emit(constants.SOCKET_EVENTS.AI_MESSAGE, {
              user: 'AI Assistant',
              message: resources.response,
              timestamp: new Date().toISOString(),
              isAI: true,
              isCrisis: false
            });
          }, 1000);
        }
      }, 1500);

    } catch (error) {
      logger.error('Error handling AI message:', error.message);
      socket.emit(constants.SOCKET_EVENTS.AI_TYPING, { typing: false });
      socket.emit('error', { message: 'Failed to get AI response' });
    }
  }

  /**
   * Handle typing indicator
   */
  handleTyping(socket, data) {
    const user = data.user || 'Anonymous';
    this.typingUsers.set(socket.id, user);
    
    socket.broadcast.emit(constants.SOCKET_EVENTS.TYPING, {
      user,
      userId: socket.id
    });
  }

  /**
   * Handle stop typing
   */
  handleStopTyping(socket) {
    this.typingUsers.delete(socket.id);
    socket.broadcast.emit(constants.SOCKET_EVENTS.STOP_TYPING, {
      userId: socket.id
    });
  }

  /**
   * Handle forum posts
   */
  handleForumPost(socket, data) {
    try {
      const validation = validateMessage(data.content);
      if (!validation.valid) {
        socket.emit('error', { message: validation.error });
        return;
      }

      const postData = {
        id: Date.now(),
        author: data.author || 'Anonymous',
        title: data.title || 'Untitled',
        content: validation.sanitized,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: []
      };

      this.io.emit(constants.SOCKET_EVENTS.FORUM_POST, postData);
      logger.info(`Forum post created by ${postData.author}`);

    } catch (error) {
      logger.error('Error handling forum post:', error.message);
      socket.emit('error', { message: 'Failed to create post' });
    }
  }

  /**
   * Handle disconnection
   */
  handleDisconnect(socket) {
    const userId = socket.id;
    this.activeUsers.delete(userId);
    this.typingUsers.delete(userId);
    
    logger.logDisconnection(userId, this.activeUsers.size);

    // Update user count
    this.io.emit(constants.SOCKET_EVENTS.USER_COUNT, {
      count: this.activeUsers.size
    });

    // Notify others user stopped typing
    socket.broadcast.emit(constants.SOCKET_EVENTS.STOP_TYPING, {
      userId
    });
  }

  /**
   * Add message to history
   */
  addToHistory(message) {
    this.messageHistory.push(message);
    
    // Keep only last N messages
    if (this.messageHistory.length > this.maxHistorySize) {
      this.messageHistory.shift();
    }
  }

  /**
   * Get message history
   */
  getMessageHistory() {
    return this.messageHistory;
  }

  /**
   * Get active users count
   */
  getActiveUsersCount() {
    return this.activeUsers.size;
  }

  /**
   * Get active users set
   */
  getActiveUsers() {
    return this.activeUsers;
  }
}

module.exports = SocketHandlers;

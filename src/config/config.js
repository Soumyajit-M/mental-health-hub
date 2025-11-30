/**
 * Application Configuration
 * Central configuration for the Mental Health Hub application
 */

require('dotenv').config();

module.exports = {
  // Server Configuration
  server: {
    port: process.env.PORT || 3001,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || '*'
  },

  // Socket.IO Configuration
  socket: {
    pingTimeout: 60000,
    pingInterval: 25000,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
    reconnectionDelayMax: 5000
  },

  // AI Service Configuration
  ai: {
    enabled: true,
    apiUrl: 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
    apiKey: process.env.HUGGINGFACE_API_KEY || '',
    timeout: 10000,
    responseDelay: {
      min: 1000,
      max: 2000
    }
  },

  // Chat Configuration
  chat: {
    maxMessageLength: 500,
    maxHistorySize: 100,
    typingTimeout: 1000
  },

  // Forum Configuration
  forum: {
    maxTitleLength: 100,
    maxContentLength: 1000
  },

  // UI Configuration
  ui: {
    toastDuration: 3000,
    loadingDelay: 500
  },

  // Security Configuration
  security: {
    inputSanitization: true,
    xssProtection: true,
    maxRequestSize: '10mb'
  }
};

/**
 * Application Constants
 * Centralized constants used throughout the application
 */

module.exports = {
  // Crisis Keywords
  CRISIS_KEYWORDS: [
    'suicide', 'kill myself', 'end my life', 'want to die', 'hurt myself',
    'self harm', 'no reason to live', 'better off dead', 'end it all'
  ],

  // Greeting Keywords
  GREETING_KEYWORDS: [
    'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'
  ],

  // Mental Health Topics
  TOPICS: {
    ANXIETY: ['anxious', 'anxiety', 'worried', 'worry', 'panic'],
    DEPRESSION: ['depressed', 'sad', 'depression', 'hopeless'],
    LONELINESS: ['lonely', 'alone', 'isolated'],
    STRESS: ['stress', 'stressed', 'overwhelmed'],
    GRATITUDE: ['thank', 'appreciate', 'grateful']
  },

  // Emergency Resources
  EMERGENCY_RESOURCES: {
    SUICIDE_PREVENTION: {
      name: 'National Suicide Prevention Lifeline',
      phone: '1-800-273-8255',
      available: '24/7'
    },
    CRISIS_TEXT: {
      name: 'Crisis Text Line',
      text: 'HOME to 741741',
      available: '24/7'
    },
    SAMHSA: {
      name: 'SAMHSA Helpline',
      phone: '1-800-662-4357',
      available: '24/7'
    }
  },

  // Message Types
  MESSAGE_TYPES: {
    USER: 'user',
    AI: 'ai',
    SYSTEM: 'system'
  },

  // Socket Events
  SOCKET_EVENTS: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    NEW_MESSAGE: 'newMessage',
    AI_MESSAGE: 'aiMessage',
    AI_TYPING: 'aiTyping',
    USER_TYPING: 'typing',
    USER_COUNT: 'userCount',
    MESSAGE_UPDATE: 'messageUpdate',
    REQUEST_RESOURCES: 'requestResources',
    ERROR: 'error'
  },

  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
  }
};

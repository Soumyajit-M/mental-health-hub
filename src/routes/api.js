/**
 * API Routes
 * HTTP endpoints for resources and chat history
 */

const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { sanitizeInput } = require('../utils/sanitizer');
const constants = require('../config/constants');

// Mental health resources data
const resources = [
  {
    title: "Understanding Anxiety",
    description: "Learn about anxiety disorders, symptoms, and coping strategies.",
    url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders"
  },
  {
    title: "Depression Support",
    description: "Resources and information about depression and treatment options.",
    url: "https://www.nimh.nih.gov/health/topics/depression"
  },
  {
    title: "Stress Management",
    description: "Techniques and tips for managing stress effectively.",
    url: "https://www.apa.org/topics/stress"
  },
  {
    title: "Mindfulness Meditation",
    description: "Guide to mindfulness practices for mental well-being.",
    url: "https://www.mindful.org/meditation/mindfulness-getting-started/"
  },
  {
    title: "Sleep Hygiene",
    description: "Tips for better sleep and mental health.",
    url: "https://www.sleepfoundation.org/sleep-hygiene"
  },
  {
    title: "Crisis Hotlines",
    description: "24/7 support: National Suicide Prevention Lifeline 1-800-273-8255",
    url: "https://suicidepreventionlifeline.org/"
  }
];

/**
 * GET /api/resources
 * Retrieve mental health resources
 */
router.get('/resources', (req, res) => {
  try {
    logger.info('Resources requested');
    res.json({ success: true, resources });
  } catch (error) {
    logger.error('Error fetching resources:', error.message);
    res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
      success: false,
      error: 'Failed to fetch resources'
    });
  }
});

/**
 * GET /api/chat/history
 * Retrieve chat message history
 */
router.get('/chat/history', (req, res) => {
  try {
    // Get socketHandlers from app context
    const socketHandlers = req.app.get('socketHandlers');
    const messageHistory = socketHandlers ? socketHandlers.getMessageHistory() : [];
    
    logger.info(`Chat history requested: ${messageHistory.length} messages`);
    res.json({
      success: true,
      messages: messageHistory,
      count: messageHistory.length
    });
  } catch (error) {
    logger.error('Error fetching chat history:', error.message);
    res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
      success: false,
      error: 'Failed to fetch chat history'
    });
  }
});

/**
 * POST /api/feedback
 * Submit user feedback
 */
router.post('/feedback', (req, res) => {
  try {
    const { message, rating } = req.body;
    
    if (!message || !rating) {
      return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: 'Message and rating are required'
      });
    }

    const sanitizedMessage = sanitizeInput(message);
    
    logger.info(`Feedback received: Rating ${rating}/5`);
    // In production, save to database
    
    res.json({
      success: true,
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    logger.error('Error processing feedback:', error.message);
    res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
      success: false,
      error: 'Failed to submit feedback'
    });
  }
});

/**
 * GET /api/stats
 * Get platform statistics
 */
router.get('/stats', (req, res) => {
  try {
    const socketHandlers = req.app.get('socketHandlers');
    const messageHistory = socketHandlers ? socketHandlers.getMessageHistory() : [];
    const activeUsers = socketHandlers ? socketHandlers.getActiveUsers() : new Set();
    
    res.json({
      success: true,
      stats: {
        totalMessages: messageHistory.length,
        activeUsers: activeUsers.size,
        uptime: process.uptime(),
        version: require('../../package.json').version
      }
    });
  } catch (error) {
    logger.error('Error fetching stats:', error.message);
    res.status(constants.HTTP_STATUS.INTERNAL_ERROR).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;

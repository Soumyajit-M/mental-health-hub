/**
 * Security Middleware
 * Handles security headers and protection
 */

const logger = require('../utils/logger');

/**
 * Security headers middleware
 */
function securityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}

/**
 * Error handling middleware
 */
function errorHandler(err, req, res, next) {
  logger.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}

/**
 * 404 handler middleware
 */
function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found' });
}

module.exports = {
  securityHeaders,
  errorHandler,
  notFoundHandler
};

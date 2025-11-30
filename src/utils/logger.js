/**
 * Logger Utility
 * Centralized logging system
 */

const config = require('../config/config');

class Logger {
  constructor() {
    this.isDevelopment = config.server.environment === 'development';
  }

  /**
   * Log info message
   * @param {string} message - Message to log
   * @param {Object} data - Additional data
   */
  info(message, data = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] [${timestamp}] ${message}`, data);
  }

  /**
   * Log error message
   * @param {string} message - Error message
   * @param {Error|Object} error - Error object
   */
  error(message, error = {}) {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] [${timestamp}] ${message}`, error);
  }

  /**
   * Log warning message
   * @param {string} message - Warning message
   * @param {Object} data - Additional data
   */
  warn(message, data = {}) {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] [${timestamp}] ${message}`, data);
  }

  /**
   * Log debug message (only in development)
   * @param {string} message - Debug message
   * @param {Object} data - Additional data
   */
  debug(message, data = {}) {
    if (this.isDevelopment) {
      const timestamp = new Date().toISOString();
      console.log(`[DEBUG] [${timestamp}] ${message}`, data);
    }
  }

  /**
   * Log connection event
   * @param {string} socketId - Socket ID
   * @param {number} totalUsers - Total connected users
   */
  logConnection(socketId, totalUsers) {
    this.info(`Client connected: ${socketId} (Total: ${totalUsers})`);
  }

  /**
   * Log disconnection event
   * @param {string} socketId - Socket ID
   * @param {number} totalUsers - Total connected users
   */
  logDisconnection(socketId, totalUsers) {
    this.info(`Client disconnected: ${socketId} (Total: ${totalUsers})`);
  }

  /**
   * Log message event
   * @param {string} socketId - Socket ID
   * @param {string} message - Message text
   */
  logMessage(socketId, message) {
    const preview = message.substring(0, 50);
    this.debug(`Message from ${socketId}: ${preview}...`);
  }

  /**
   * Log AI response
   * @param {string} socketId - Socket ID
   */
  logAIResponse(socketId) {
    this.debug(`AI responded to ${socketId}`);
  }
}

module.exports = new Logger();

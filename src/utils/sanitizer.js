/**
 * Input Sanitization Utility
 * Provides functions to sanitize and validate user input
 */

/**
 * Sanitize text input
 * @param {string} input - Raw input string
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} Sanitized string
 */
function sanitizeInput(input, maxLength = 500) {
  if (typeof input !== 'string') return '';
  return input.trim().substring(0, maxLength);
}

/**
 * Sanitize HTML to prevent XSS
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
function sanitizeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Validate message object
 * @param {Object} message - Message object to validate
 * @returns {boolean} True if valid
 */
function validateMessage(message) {
  return (
    message &&
    typeof message === 'object' &&
    typeof message.text === 'string' &&
    message.text.trim().length > 0
  );
}

module.exports = {
  sanitizeInput,
  sanitizeHTML,
  validateMessage
};

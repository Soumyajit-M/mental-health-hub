/**
 * UI Utilities
 * Toast notifications, loading states, and common UI functions
 */

const UIUtils = {
  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${this.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /**
   * Show loading overlay
   */
  showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  },

  /**
   * Hide loading overlay
   */
  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Format timestamp
   */
  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // Less than 1 minute
    if (diff < 60000) {
      return 'Just now';
    }

    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    // Less than 24 hours
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    // Format as date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Sanitize input
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.trim().substring(0, 500);
  },

  /**
   * Validate message
   */
  validateMessage(message) {
    if (!message || message.trim().length === 0) {
      return { valid: false, error: 'Message cannot be empty' };
    }
    if (message.length > 500) {
      return { valid: false, error: 'Message is too long (max 500 characters)' };
    }
    return { valid: true, sanitized: this.sanitizeInput(message) };
  },

  /**
   * Update connection status UI
   */
  updateConnectionStatus(isConnected) {
    const statusEl = document.getElementById('connection-status');
    const statusDot = statusEl?.querySelector('.status-dot');
    const statusText = statusEl?.querySelector('.status-text');
    
    if (statusDot && statusText) {
      if (isConnected) {
        statusDot.classList.remove('disconnected');
        statusText.textContent = 'Connected';
      } else {
        statusDot.classList.add('disconnected');
        statusText.textContent = 'Disconnected';
      }
    }
  },

  /**
   * Update online user count
   */
  updateOnlineCount(count) {
    const userCountEl = document.getElementById('user-count');
    if (userCountEl) {
      userCountEl.textContent = count;
    }
  }
};

// Export for use in other modules
window.UIUtils = UIUtils;

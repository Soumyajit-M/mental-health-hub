/**
 * Chat Manager
 * Handles chat functionality and AI messaging
 */

class ChatManager {
  constructor(socket) {
    this.socket = socket;
    this.typingTimer = null;
    this.typingTimeout = 1000;
    this.username = 'User';
    this.init();
  }

  init() {
    // Get DOM elements
    this.messageInput = document.getElementById('message-input');
    this.sendBtn = document.getElementById('send-btn');
    this.messagesContainer = document.getElementById('messages');
    this.aiInput = document.getElementById('ai-message-input');
    this.aiSendBtn = document.getElementById('ai-send-btn');
    this.aiMessages = document.getElementById('ai-messages');

    // Set up event listeners
    this.setupEventListeners();
    this.setupSocketListeners();
  }

  setupEventListeners() {
    // Regular chat
    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.sendMessage());
    }

    if (this.messageInput) {
      this.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });

      this.messageInput.addEventListener('input', () => this.handleTyping());
    }

    // AI chat
    if (this.aiSendBtn) {
      this.aiSendBtn.addEventListener('click', () => this.sendAIMessage());
    }

    if (this.aiInput) {
      this.aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendAIMessage();
        }
      });
    }
  }

  setupSocketListeners() {
    // Regular chat messages
    this.socket.on('chatMessage', (data) => {
      this.displayMessage(data);
    });

    // Chat history
    this.socket.on('chatHistory', (history) => {
      history.forEach(msg => this.displayMessage(msg));
    });

    // AI messages
    this.socket.on('aiMessage', (data) => {
      this.displayAIMessage(data);
    });

    // AI typing indicator
    this.socket.on('aiTyping', (data) => {
      this.showAITyping(data.typing);
    });

    // Typing indicators
    this.socket.on('typing', (data) => {
      this.showTypingIndicator(data.user);
    });

    this.socket.on('stopTyping', () => {
      this.hideTypingIndicator();
    });
  }

  sendMessage() {
    const message = this.messageInput?.value;
    if (!message) return;

    const validation = UIUtils.validateMessage(message);
    if (!validation.valid) {
      UIUtils.showToast(validation.error, 'error');
      return;
    }

    this.socket.emit('chatMessage', {
      user: this.username,
      message: validation.sanitized
    });

    this.messageInput.value = '';
    this.socket.emit('stopTyping');
  }

  sendAIMessage() {
    const message = this.aiInput?.value;
    if (!message) return;

    const validation = UIUtils.validateMessage(message);
    if (!validation.valid) {
      UIUtils.showToast(validation.error, 'error');
      return;
    }

    this.socket.emit('aiMessage', {
      user: this.username,
      message: validation.sanitized
    });

    this.aiInput.value = '';
  }

  displayMessage(data) {
    if (!this.messagesContainer) return;

    const messageEl = document.createElement('div');
    messageEl.className = `message ${data.isSystem ? 'system-message' : ''}`;

    const time = UIUtils.formatTimestamp(data.timestamp);

    messageEl.innerHTML = `
      <div class="message-header">
        <strong>${UIUtils.escapeHtml(data.user)}</strong>
        <span class="message-time">${time}</span>
      </div>
      <div class="message-content">${UIUtils.escapeHtml(data.message)}</div>
    `;

    this.messagesContainer.appendChild(messageEl);
    this.scrollToBottom(this.messagesContainer);
  }

  displayAIMessage(data) {
    if (!this.aiMessages) return;

    const messageEl = document.createElement('div');
    const isUser = data.user !== 'AI Assistant';
    messageEl.className = `ai-message ${isUser ? 'user' : 'assistant'}`;

    if (data.isCrisis) {
      messageEl.classList.add('crisis');
    }

    const time = UIUtils.formatTimestamp(data.timestamp);

    messageEl.innerHTML = `
      <div class="message-header">
        <strong>${UIUtils.escapeHtml(data.user)}</strong>
        <span class="message-time">${time}</span>
      </div>
      <div class="message-content">${this.formatAIMessage(data.message)}</div>
    `;

    this.aiMessages.appendChild(messageEl);
    this.scrollToBottom(this.aiMessages);
  }

  formatAIMessage(message) {
    // Convert URLs to links
    let formatted = UIUtils.escapeHtml(message);
    formatted = formatted.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    // Convert line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  }

  showAITyping(isTyping) {
    let typingIndicator = document.getElementById('ai-typing-indicator');
    
    if (isTyping) {
      if (!typingIndicator) {
        typingIndicator = document.createElement('div');
        typingIndicator.id = 'ai-typing-indicator';
        typingIndicator.className = 'ai-message assistant typing';
        typingIndicator.innerHTML = `
          <div class="message-header">
            <strong>AI Assistant</strong>
          </div>
          <div class="message-content">
            <span class="typing-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
        `;
        this.aiMessages?.appendChild(typingIndicator);
        this.scrollToBottom(this.aiMessages);
      }
    } else {
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }
  }

  handleTyping() {
    this.socket.emit('typing', { user: this.username });
    
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.socket.emit('stopTyping');
    }, this.typingTimeout);
  }

  showTypingIndicator(user) {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.textContent = `${user} is typing...`;
      indicator.style.display = 'block';
    }
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.style.display = 'none';
    }
  }

  scrollToBottom(container) {
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  setUsername(name) {
    this.username = name || 'User';
  }
}

// Export for use in other modules
window.ChatManager = ChatManager;

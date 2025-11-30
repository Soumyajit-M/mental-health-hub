// ============================================
// Professional Mental Health Hub Application
// ============================================

// Configuration
const CONFIG = {
    typingTimeout: 1000,
    messageMaxLength: 500,
    postMaxLength: 1000,
    toastDuration: 3000
};

// Application State
const state = {
    isConnected: false,
    onlineUsers: 0,
    currentSection: 'resources',
    isDarkMode: false,
    posts: []
};

// ============================================
// Socket.IO Setup
// ============================================

const socket = io({
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
    reconnectionDelayMax: 5000
});

// Connection Event Handlers
socket.on('connect', () => {
    console.log('Connected to server');
    state.isConnected = true;
    updateConnectionStatus(true);
    showToast('Connected to server', 'success');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    state.isConnected = false;
    updateConnectionStatus(false);
    showToast('Connection lost. Attempting to reconnect...', 'warning');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    state.isConnected = false;
    updateConnectionStatus(false);
});

socket.on('reconnect', (attemptNumber) => {
    console.log(`Reconnected after ${attemptNumber} attempts`);
    showToast('Reconnected successfully!', 'success');
});

// User count updates
socket.on('userCount', (count) => {
    state.onlineUsers = count;
    updateOnlineCount(count);
});

// ============================================
// Utility Functions
// ============================================

function updateConnectionStatus(isConnected) {
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
}

function updateOnlineCount(count) {
    const userCountEl = document.getElementById('user-count');
    if (userCountEl) {
        userCountEl.textContent = count;
    }
}

function showToast(message, type = 'info') {
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
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">×</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));

    container.appendChild(toast);

    setTimeout(() => removeToast(toast), CONFIG.toastDuration);
}

function removeToast(toast) {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
}

function formatTime(date = new Date()) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
}

function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Loading Overlay
// ============================================

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        setTimeout(() => overlay.remove(), 300);
    }
}

// ============================================
// Theme Toggle
// ============================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        state.isDarkMode = true;
        if (themeToggle) {
            themeToggle.querySelector('.theme-icon').textContent = '☀️';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            state.isDarkMode = !state.isDarkMode;
            
            themeToggle.querySelector('.theme-icon').textContent = 
                state.isDarkMode ? '☀️' : '🌙';
            
            localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
            
            showToast(`${state.isDarkMode ? 'Dark' : 'Light'} mode enabled`, 'success');
        });
    }
}

// ============================================
// Navigation
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Smooth scroll to section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                state.currentSection = targetId;
            }
        });
    });
}

// ============================================
// Resources Section
// ============================================

async function loadResources() {
    try {
        const response = await fetch('/api/resources');
        if (!response.ok) throw new Error('Failed to load resources');
        
        const resources = await response.json();
        displayResources(resources);
    } catch (error) {
        console.error('Error loading resources:', error);
        showToast('Failed to load resources. Please try again.', 'error');
    }
}

function displayResources(resources) {
    const resourceList = document.getElementById('resource-list');
    if (!resourceList) return;
    
    resourceList.innerHTML = '';

    if (!Array.isArray(resources) || resources.length === 0) {
        resourceList.innerHTML = '<p>No resources available at this time.</p>';
        return;
    }

    resources.forEach((resource, index) => {
        const item = document.createElement('div');
        item.className = 'resource-item fade-in';
        item.style.animationDelay = `${index * 0.1}s`;

        const title = document.createElement('h3');
        title.textContent = resource.title;

        const description = document.createElement('p');
        description.textContent = resource.description;

        item.appendChild(title);
        item.appendChild(description);

        if (resource.contact) {
            const contact = document.createElement('p');
            contact.innerHTML = `<strong>Contact:</strong> ${sanitizeHTML(resource.contact)}`;
            item.appendChild(contact);
        }

        if (resource.link) {
            const link = document.createElement('p');
            link.innerHTML = `<a href="${sanitizeHTML(resource.link)}" target="_blank" rel="noopener noreferrer">Learn More →</a>`;
            item.appendChild(link);
        }

        resourceList.appendChild(item);
    });
}

// ============================================
// Chat Section
// ============================================

let typingTimer;
let isTyping = false;

async function loadChatMessages() {
    try {
        const response = await fetch('/api/chat');
        if (!response.ok) throw new Error('Failed to load chat messages');
        
        const messages = await response.json();
        displayMessages(messages);
    } catch (error) {
        console.error('Error loading chat messages:', error);
        showToast('Failed to load chat history', 'error');
    }
}

function displayMessages(messages) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    chatMessages.innerHTML = '';

    if (!Array.isArray(messages)) {
        console.error('Invalid messages format');
        return;
    }

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        
        // Determine message class
        if (message.isAI) {
            messageDiv.className = 'message ai-message';
            
            // Add AI badge
            const badge = document.createElement('span');
            badge.className = 'ai-badge';
            badge.innerHTML = '🤖 AI Assistant';
            messageDiv.appendChild(badge);
        } else {
            messageDiv.className = `message ${message.isOwn ? 'own' : 'other'}`;
        }
        
        const textSpan = document.createElement('span');
        textSpan.textContent = message.text || '';
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = message.timestamp ? formatRelativeTime(message.timestamp) : formatTime();
        
        messageDiv.appendChild(textSpan);
        messageDiv.appendChild(timeSpan);
        
        // Add crisis styling if needed
        if (message.isCrisis) {
            messageDiv.classList.add('crisis-message');
        }
        
        chatMessages.appendChild(messageDiv);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function initChatForm() {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const charCount = document.getElementById('char-count');
    const resourceBtn = document.getElementById('request-resources-btn');

    if (!chatForm || !messageInput) return;

    // Resources button
    if (resourceBtn) {
        resourceBtn.addEventListener('click', () => {
            socket.emit('requestResources');
            showToast('Requesting mental health resources...', 'info');
        });
    }

    // Character counter
    if (charCount) {
        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            charCount.textContent = `${length}/${CONFIG.messageMaxLength}`;
            
            if (length > CONFIG.messageMaxLength * 0.9) {
                charCount.style.color = 'var(--danger-color)';
            } else {
                charCount.style.color = 'var(--text-tertiary)';
            }
        });
    }

    // Typing indicator
    messageInput.addEventListener('input', () => {
        if (!isTyping && messageInput.value.length > 0) {
            isTyping = true;
            socket.emit('typing', true);
        }

        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            isTyping = false;
            socket.emit('typing', false);
        }, CONFIG.typingTimeout);
    });

    // Form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const message = messageInput.value.trim();

        if (!message) return;

        if (!state.isConnected) {
            showToast('Not connected to server. Please wait for reconnection.', 'warning');
            return;
        }

        if (message.length > CONFIG.messageMaxLength) {
            showToast(`Message is too long (max ${CONFIG.messageMaxLength} characters)`, 'error');
            return;
        }

        socket.emit('newMessage', { text: message, isOwn: true });
        messageInput.value = '';
        
        if (charCount) {
            charCount.textContent = '0/500';
            charCount.style.color = 'var(--text-tertiary)';
        }
    });
}

// Listen for typing indicators from other users
socket.on('userTyping', (isUserTyping) => {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.style.display = isUserTyping ? 'flex' : 'none';
    }
});

// Listen for AI typing indicator
socket.on('aiTyping', (isTyping) => {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator && isTyping) {
        typingIndicator.style.display = 'flex';
        typingIndicator.innerHTML = '<span></span><span></span><span></span> <small style="margin-left: 8px; color: var(--text-tertiary);">AI is typing...</small>';
    } else if (typingIndicator) {
        typingIndicator.style.display = 'none';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    }
});

// Listen for AI messages
socket.on('aiMessage', (message) => {
    if (!message || !message.text) return;
    
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    
    // Create AI badge
    const badge = document.createElement('span');
    badge.className = 'ai-badge';
    badge.innerHTML = '🤖 AI Assistant';
    
    const textSpan = document.createElement('span');
    textSpan.textContent = message.text;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = message.timestamp ? formatRelativeTime(message.timestamp) : formatTime();
    
    messageDiv.appendChild(badge);
    messageDiv.appendChild(textSpan);
    messageDiv.appendChild(timeSpan);
    
    // Add crisis styling if needed
    if (message.isCrisis) {
        messageDiv.classList.add('crisis-message');
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show notification
    if (!document.hasFocus()) {
        showToast('AI Assistant replied', 'info');
    }
});

// Listen for new messages from server
socket.on('messageUpdate', (messages) => {
    displayMessages(messages);
});

// ============================================
// Forum Section
// ============================================

function initForumSort() {
    const sortSelect = document.getElementById('forum-sort');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortForumPosts(sortSelect.value);
        });
    }
}

function sortForumPosts(sortBy) {
    const forumPosts = document.getElementById('forum-posts');
    if (!forumPosts) return;

    const posts = Array.from(forumPosts.querySelectorAll('.forum-post'));
    
    posts.sort((a, b) => {
        const aTime = a.dataset.timestamp || 0;
        const bTime = b.dataset.timestamp || 0;
        
        switch (sortBy) {
            case 'newest':
                return bTime - aTime;
            case 'oldest':
                return aTime - bTime;
            case 'popular':
                const aLikes = parseInt(a.dataset.likes || 0);
                const bLikes = parseInt(b.dataset.likes || 0);
                return bLikes - aLikes;
            default:
                return 0;
        }
    });

    posts.forEach(post => forumPosts.appendChild(post));
}

function initForumForm() {
    const forumForm = document.getElementById('forum-form');
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const postCharCount = document.getElementById('post-char-count');

    if (!forumForm || !postTitle || !postContent) return;

    // Character counter
    if (postCharCount) {
        postContent.addEventListener('input', () => {
            const length = postContent.value.length;
            postCharCount.textContent = `${length}/${CONFIG.postMaxLength}`;
            
            if (length > CONFIG.postMaxLength * 0.9) {
                postCharCount.style.color = 'var(--danger-color)';
            } else {
                postCharCount.style.color = 'var(--text-tertiary)';
            }
        });
    }

    // Form submission
    forumForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = postTitle.value.trim();
        const content = postContent.value.trim();

        if (!title || !content) {
            showToast('Please fill in all fields', 'warning');
            return;
        }

        if (content.length > CONFIG.postMaxLength) {
            showToast(`Post is too long (max ${CONFIG.postMaxLength} characters)`, 'error');
            return;
        }

        addForumPost(title, content);
        postTitle.value = '';
        postContent.value = '';
        
        if (postCharCount) {
            postCharCount.textContent = '0/1000';
            postCharCount.style.color = 'var(--text-tertiary)';
        }

        showToast('Post published successfully!', 'success');
        
        // Scroll to the new post
        setTimeout(() => {
            const forumSection = document.getElementById('forum');
            if (forumSection) {
                forumSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    });
}

function addForumPost(title, content) {
    const forumPosts = document.getElementById('forum-posts');
    if (!forumPosts) return;

    const timestamp = Date.now();
    const postDiv = document.createElement('article');
    postDiv.className = 'forum-post fade-in';
    postDiv.setAttribute('role', 'article');
    postDiv.dataset.timestamp = timestamp;
    postDiv.dataset.likes = '0';

    postDiv.innerHTML = `
        <div class="post-header">
            <h3>${sanitizeHTML(title)}</h3>
            <span class="post-meta">Posted by User • ${formatRelativeTime(new Date())}</span>
        </div>
        <p>${sanitizeHTML(content)}</p>
        <div class="post-actions">
            <button class="post-action-btn like-btn" aria-label="Like post" data-likes="0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span class="like-count">0</span>
            </button>
            <button class="post-action-btn" aria-label="Reply to post">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                <span>Reply</span>
            </button>
        </div>
    `;

    // Add like button functionality
    const likeBtn = postDiv.querySelector('.like-btn');
    likeBtn.addEventListener('click', function() {
        let likes = parseInt(this.dataset.likes);
        likes++;
        this.dataset.likes = likes;
        this.querySelector('.like-count').textContent = likes;
        postDiv.dataset.likes = likes;
        
        // Add animation
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Insert new post at the top (after the welcome post)
    const firstPost = forumPosts.querySelector('.forum-post');
    if (firstPost && firstPost.nextSibling) {
        forumPosts.insertBefore(postDiv, firstPost.nextSibling);
    } else {
        forumPosts.appendChild(postDiv);
    }
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Mental Health Hub...');
    
    // Hide loading overlay immediately
    hideLoadingOverlay();
    
    try {
        // Initialize all features
        initThemeToggle();
        initNavigation();
        initChatForm();
        initForumForm();
        initForumSort();
        
        // Load async data after UI is ready
        loadResources().catch(err => console.error('Resources error:', err));
        loadChatMessages().catch(err => console.error('Chat error:', err));
        
        console.log('Mental Health Hub initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Error loading application. Please refresh the page.', 'error');
    }
});

// Handle page visibility for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - reducing activity');
    } else {
        console.log('Page visible - resuming activity');
        // Refresh data when page becomes visible
        loadResources();
        loadChatMessages();
    }
});

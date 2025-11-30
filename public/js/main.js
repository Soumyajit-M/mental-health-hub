/**
 * Mental Health Hub - Main Application
 * Entry point for the client-side application
 */

// Application State
const AppState = {
  isConnected: false,
  onlineUsers: 0,
  currentSection: 'resources',
  username: 'User'
};

// Initialize Socket.IO AFTER DOM is ready
let socket = null;

// Module instances
let themeManager;
let chatManager;
let forumManager;
let resourcesManager;

/**
 * Initialize the application
 */
function initializeApp() {
  console.log('🚀 Initializing Mental Health Hub...');

  // Initialize Socket.IO
  socket = io({
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
    reconnectionDelayMax: 5000
  });

  // Initialize modules
  themeManager = new ThemeManager();
  chatManager = new ChatManager(socket);
  forumManager = new ForumManager(socket);
  resourcesManager = new ResourcesManager();
  
  // Initialize resources manager after DOM is ready
  resourcesManager.init();

  // Set up socket connection handlers
  setupSocketHandlers();

  // Set up navigation
  setupNavigation();

  // Set up username
  setupUsername();

  // Set up resource button
  setupResourceButton();

  // Show initial section
  showSection(AppState.currentSection);

  console.log('✅ Application initialized successfully');
}

/**
 * Set up socket event handlers
 */
function setupSocketHandlers() {
  socket.on('connect', () => {
    console.log('Connected to server');
    AppState.isConnected = true;
    UIUtils.updateConnectionStatus(true);
    UIUtils.showToast('Connected to server', 'success');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    AppState.isConnected = false;
    UIUtils.updateConnectionStatus(false);
    UIUtils.showToast('Connection lost. Attempting to reconnect...', 'warning');
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    AppState.isConnected = false;
    UIUtils.updateConnectionStatus(false);
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log(`Reconnected after ${attemptNumber} attempts`);
    UIUtils.showToast('Reconnected successfully!', 'success');
  });

  socket.on('userCount', (data) => {
    AppState.onlineUsers = data.count;
    UIUtils.updateOnlineCount(data.count);
  });
}

/**
 * Set up navigation between sections
 */
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      if (section) {
        showSection(section);
        
        // Update active state
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });
}

/**
 * Show specific section
 */
function showSection(sectionName) {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    if (section.id === `${sectionName}-section`) {
      section.classList.add('active');
      section.style.display = 'block';
    } else {
      section.classList.remove('active');
      section.style.display = 'none';
    }
  });

  AppState.currentSection = sectionName;
}

/**
 * Set up username functionality
 */
function setupUsername() {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    AppState.username = savedUsername;
    chatManager.setUsername(savedUsername);
    forumManager.setUsername(savedUsername);
    updateUsernameDisplay();
  }

  const usernameBtn = document.getElementById('username-btn');
  if (usernameBtn) {
    usernameBtn.addEventListener('click', promptUsername);
  }
}

/**
 * Prompt user for username
 */
function promptUsername() {
  const newUsername = prompt('Enter your username:', AppState.username);
  
  if (newUsername && newUsername.trim()) {
    const sanitized = UIUtils.sanitizeInput(newUsername);
    AppState.username = sanitized;
    localStorage.setItem('username', sanitized);
    chatManager.setUsername(sanitized);
    forumManager.setUsername(sanitized);
    updateUsernameDisplay();
    UIUtils.showToast(`Username updated to ${sanitized}`, 'success');
  }
}

/**
 * Update username display
 */
function updateUsernameDisplay() {
  const usernameBtn = document.getElementById('username-btn');
  if (usernameBtn) {
    usernameBtn.textContent = `👤 ${AppState.username}`;
    usernameBtn.setAttribute('aria-label', `Current username: ${AppState.username}. Click to change.`);
  }
}

/**
 * Set up resource button in AI section
 */
function setupResourceButton() {
  const resourceBtn = document.getElementById('show-resources-btn');
  if (resourceBtn) {
    resourceBtn.addEventListener('click', () => {
      const resourcesInfo = `
🆘 Emergency Resources:

• National Suicide Prevention Lifeline
  📞 1-800-273-8255 (24/7)

• Crisis Text Line
  📱 Text HOME to 741741

• SAMHSA National Helpline
  📞 1-800-662-4357 (24/7)

💙 Online Support:
• BetterHelp.com - Online therapy
• 7Cups.com - Free emotional support
• NAMI.org - Mental health resources

If you're in immediate danger, please call 911 or go to your nearest emergency room.
      `.trim();

      alert(resourcesInfo);
    });
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Expose global functions for inline event handlers
window.showSection = showSection;
window.resourcesManager = null;
window.chatManager = null;
window.forumManager = null;

// Update references after initialization
setTimeout(() => {
  window.resourcesManager = resourcesManager;
  window.chatManager = chatManager;
  window.forumManager = forumManager;
}, 100);

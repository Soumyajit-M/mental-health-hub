/**
 * Theme Manager
 * Handles dark/light mode toggle and persistence
 */

class ThemeManager {
  constructor() {
    this.isDarkMode = false;
    this.init();
  }

  init() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }

    // Set up toggle button
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    if (this.isDarkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode() {
    document.body.classList.add('dark-mode');
    this.isDarkMode = true;
    localStorage.setItem('theme', 'dark');
    this.updateToggleIcon();
  }

  disableDarkMode() {
    document.body.classList.remove('dark-mode');
    this.isDarkMode = false;
    localStorage.setItem('theme', 'light');
    this.updateToggleIcon();
  }

  updateToggleIcon() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = this.isDarkMode ? '☀️' : '🌙';
      toggleBtn.setAttribute('aria-label', 
        this.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }
}

// Export for use in other modules
window.ThemeManager = ThemeManager;

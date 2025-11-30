/**
 * Resources Manager
 * Handles mental health resources display
 */

class ResourcesManager {
  constructor() {
    this.resources = [];
    this.resourcesContainer = null;
  }

  init() {
    this.resourcesContainer = document.getElementById('resources-list');
    if (this.resourcesContainer) {
      this.loadResources();
    }
  }

  async loadResources() {
    try {
      if (typeof UIUtils !== 'undefined' && UIUtils.showLoading) {
        UIUtils.showLoading();
      }
      
      const response = await fetch('/api/resources');
      const data = await response.json();
      
      if (data.success && data.resources) {
        this.resources = data.resources;
        this.renderResources();
      } else {
        throw new Error('Failed to load resources');
      }
    } catch (error) {
      console.error('Error loading resources:', error);
      if (typeof UIUtils !== 'undefined' && UIUtils.showToast) {
        UIUtils.showToast('Failed to load resources', 'error');
      }
      this.renderErrorState();
    } finally {
      if (typeof UIUtils !== 'undefined' && UIUtils.hideLoading) {
        UIUtils.hideLoading();
      }
    }
  }

  renderResources() {
    if (!this.resourcesContainer) return;

    if (this.resources.length === 0) {
      this.resourcesContainer.innerHTML = `
        <div class="empty-state">
          <p>No resources available at the moment.</p>
        </div>
      `;
      return;
    }

    this.resourcesContainer.innerHTML = this.resources.map((resource, index) => `
      <div class="resource-card" style="animation-delay: ${index * 0.1}s">
        <h3>${UIUtils.escapeHtml(resource.title)}</h3>
        <p>${UIUtils.escapeHtml(resource.description)}</p>
        <a href="${UIUtils.escapeHtml(resource.url)}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="resource-link"
           aria-label="Open ${UIUtils.escapeHtml(resource.title)} in new tab">
          Learn More →
        </a>
      </div>
    `).join('');
  }

  renderErrorState() {
    if (!this.resourcesContainer) return;

    this.resourcesContainer.innerHTML = `
      <div class="error-state">
        <p>❌ Unable to load resources. Please try again later.</p>
        <button onclick="resourcesManager.loadResources()" class="retry-btn">
          Retry
        </button>
      </div>
    `;
  }

  refresh() {
    this.loadResources();
  }
}

// Export for use in other modules
window.ResourcesManager = ResourcesManager;

/**
 * Template Manager
 * Handles template cycling and management
 */

class TemplateManager {
  constructor() {
    this.templates = [];
    this.currentIndex = 0;
  }

  /**
   * Initialize with templates data
   */
  init() {
    // Use embedded data from data.js (no fetch needed)
    this.templates = APP_DATA.templates;
    return this.templates;
  }

  /**
   * Get all templates
   */
  getAll() {
    return this.templates;
  }

  /**
   * Get template by ID
   */
  getById(id) {
    return this.templates.find(t => t.id === id);
  }

  /**
   * Get template by index
   */
  getByIndex(index) {
    if (index >= 0 && index < this.templates.length) {
      return this.templates[index];
    }
    return this.templates[0];
  }

  /**
   * Get current template
   */
  getCurrent() {
    return this.templates[this.currentIndex];
  }

  /**
   * Set current template by ID
   */
  setCurrent(id) {
    const index = this.templates.findIndex(t => t.id === id);
    if (index !== -1) {
      this.currentIndex = index;
      return this.templates[index];
    }
    return null;
  }

  /**
   * Get next template
   */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.templates.length;
    return this.getCurrent();
  }

  /**
   * Get previous template
   */
  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.templates.length) % this.templates.length;
    return this.getCurrent();
  }

  /**
   * Get random template
   */
  random() {
    const randomIndex = Math.floor(Math.random() * this.templates.length);
    this.currentIndex = randomIndex;
    return this.getCurrent();
  }

  /**
   * Apply template to element
   */
  apply(element, templateId) {
    if (element) {
      element.setAttribute('data-template', templateId);
      this.setCurrent(templateId);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TemplateManager;
}

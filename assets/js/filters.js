/**
 * Filter functionality for projects page
 * Handles client-side filtering without page reloads
 */

class ProjectFilter {
  constructor() {
    this.activeFilters = new Set();
    this.projects = [];
    this.init();
  }

  init() {
    // Wait for main app to load data
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        if (window.app && window.app.data.projects) {
          this.projects = window.app.data.projects;
          this.setupFilters();
        }
      }, 500);
    });
  }

  setupFilters() {
    // Collect all unique tags and technologies
    const allTags = new Set();
    const allTech = new Set();

    this.projects.forEach(project => {
      project.tags?.forEach(tag => allTags.add(tag));
      project.tech?.forEach(tech => allTech.add(tech));
    });

    // Create filter UI
    this.createFilterUI(allTags, allTech);
    
    // Setup event listeners
    this.setupEventListeners();
  }

  createFilterUI(tags, tech) {
    const filterContainer = document.querySelector('.filter-section');
    if (!filterContainer) return;

    filterContainer.innerHTML = `
      <div class="filter-header">
        <h3 class="filter-title">Projekte filtern</h3>
        <button class="btn btn-secondary btn-sm" id="reset-filters">Alle anzeigen</button>
      </div>
      
      <div class="filter-group">
        <h4>Nach Kategorien:</h4>
        <div class="filter-tags" data-filter-type="tags">
          ${Array.from(tags).map(tag => `
            <button class="filter-tag" data-value="${tag}" data-type="tag">
              ${tag}
            </button>
          `).join('')}
        </div>
      </div>
      
      <div class="filter-group">
        <h4>Nach Technologien:</h4>
        <div class="filter-tags" data-filter-type="tech">
          ${Array.from(tech).map(technology => `
            <button class="filter-tag" data-value="${technology}" data-type="tech">
              ${technology}
            </button>
          `).join('')}
        </div>
      </div>
      
      <div class="filter-status">
        <span id="filter-count">${this.projects.length} Projekte angezeigt</span>
      </div>
    `;
  }

  setupEventListeners() {
    const filterContainer = document.querySelector('.filter-section');
    if (!filterContainer) return;

    // Filter tag clicks
    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-tag')) {
        this.toggleFilter(e.target);
      }
    });

    // Reset button
    const resetButton = filterContainer.querySelector('#reset-filters');
    if (resetButton) {
      resetButton.addEventListener('click', () => this.resetFilters());
    }

    // Keyboard support
    filterContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('filter-tag')) {
          e.preventDefault();
          this.toggleFilter(e.target);
        }
      }
    });
  }

  toggleFilter(filterElement) {
    const value = filterElement.dataset.value;
    const type = filterElement.dataset.type;
    const filterKey = `${type}:${value}`;

    filterElement.classList.toggle('active');
    
    if (this.activeFilters.has(filterKey)) {
      this.activeFilters.delete(filterKey);
    } else {
      this.activeFilters.add(filterKey);
    }

    this.applyFilters();
    this.updateFilterStatus();
  }

  applyFilters() {
    const projectCards = document.querySelectorAll('.project-card');
    let visibleCount = 0;

    projectCards.forEach((card, index) => {
      const project = this.projects[index];
      const shouldShow = this.shouldShowProject(project);
      
      if (shouldShow) {
        card.style.display = 'block';
        card.classList.add('fade-in');
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.classList.remove('fade-in');
      }
    });

    // Update count
    const countElement = document.querySelector('#filter-count');
    if (countElement) {
      countElement.textContent = `${visibleCount} von ${this.projects.length} Projekten angezeigt`;
    }

    // Show "no results" message if needed
    this.toggleNoResultsMessage(visibleCount === 0);
  }

  shouldShowProject(project) {
    if (this.activeFilters.size === 0) return true;

    // Convert active filters to arrays by type
    const activeTagFilters = Array.from(this.activeFilters)
      .filter(filter => filter.startsWith('tag:'))
      .map(filter => filter.replace('tag:', ''));
    
    const activeTechFilters = Array.from(this.activeFilters)
      .filter(filter => filter.startsWith('tech:'))
      .map(filter => filter.replace('tech:', ''));

    // Check if project matches any active tag filters
    const matchesTags = activeTagFilters.length === 0 || 
      activeTagFilters.some(tag => project.tags?.includes(tag));

    // Check if project matches any active tech filters
    const matchesTech = activeTechFilters.length === 0 || 
      activeTechFilters.some(tech => project.tech?.includes(tech));

    // Project must match both tag and tech filters (AND logic within type, OR logic between types)
    return matchesTags && matchesTech;
  }

  resetFilters() {
    // Clear active filters
    this.activeFilters.clear();
    
    // Remove active class from all filter buttons
    document.querySelectorAll('.filter-tag.active').forEach(button => {
      button.classList.remove('active');
    });

    // Show all projects
    this.applyFilters();
    
    // Update status
    this.updateFilterStatus();
  }

  updateFilterStatus() {
    const activeCount = this.activeFilters.size;
    const resetButton = document.querySelector('#reset-filters');
    
    if (resetButton) {
      resetButton.style.display = activeCount > 0 ? 'inline-block' : 'none';
    }

    // Update URL with active filters (for sharing/bookmarking)
    this.updateURL();
  }

  updateURL() {
    if (this.activeFilters.size === 0) {
      // Remove filter parameters
      const url = new URL(window.location);
      url.searchParams.delete('filters');
      window.history.replaceState({}, '', url);
      return;
    }

    // Add filter parameters to URL
    const filterArray = Array.from(this.activeFilters);
    const url = new URL(window.location);
    url.searchParams.set('filters', filterArray.join(','));
    window.history.replaceState({}, '', url);
  }

  loadFiltersFromURL() {
    const url = new URL(window.location);
    const filtersParam = url.searchParams.get('filters');
    
    if (filtersParam) {
      const filters = filtersParam.split(',');
      filters.forEach(filter => {
        this.activeFilters.add(filter);
        
        // Activate corresponding filter buttons
        const [type, value] = filter.split(':');
        const button = document.querySelector(`[data-type="${type}"][data-value="${value}"]`);
        if (button) {
          button.classList.add('active');
        }
      });
      
      this.applyFilters();
      this.updateFilterStatus();
    }
  }

  toggleNoResultsMessage(show) {
    let messageElement = document.querySelector('.no-results-message');
    
    if (show && !messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'no-results-message card text-center';
      messageElement.innerHTML = `
        <h3>Keine Projekte gefunden</h3>
        <p>Versuchen Sie es mit anderen Filterkriterien oder setzen Sie die Filter zurück.</p>
        <button class="btn btn-secondary" onclick="projectFilter.resetFilters()">
          Filter zurücksetzen
        </button>
      `;
      
      const projectsGrid = document.querySelector('.projects-grid');
      if (projectsGrid) {
        projectsGrid.parentNode.insertBefore(messageElement, projectsGrid.nextSibling);
      }
    } else if (!show && messageElement) {
      messageElement.remove();
    }
  }

  // Public method to add custom filters programmatically
  addFilter(type, value) {
    const filterKey = `${type}:${value}`;
    this.activeFilters.add(filterKey);
    
    const button = document.querySelector(`[data-type="${type}"][data-value="${value}"]`);
    if (button) {
      button.classList.add('active');
    }
    
    this.applyFilters();
    this.updateFilterStatus();
  }

  // Public method to get current active filters
  getActiveFilters() {
    return Array.from(this.activeFilters);
  }
}

// Initialize filter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('projekte.html')) {
    window.projectFilter = new ProjectFilter();
  }
});

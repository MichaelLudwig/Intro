/**
 * Portfolio Website - Main JavaScript
 * Handles theme switching, navigation, and data loading
 */

class PortfolioApp {
  constructor() {
    this.data = {};
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  async init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupMobileNavigation();
    await this.loadData();
    this.setupEventListeners();
    
    // Load page-specific content
    const page = this.getCurrentPage();
    await this.loadPageContent(page);
  }

  // Theme Management
  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    // Set initial logo based on current theme
    this.updateLogo();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
    
    // Update logo based on theme
    this.updateLogo();
  }

  updateLogo() {
    const logos = document.querySelectorAll('.nav-logo');
    const logoSrc = this.currentTheme === 'dark' ? 'assets/img/Logo3-black.png' : 'assets/img/Logo3.png';
    
    logos.forEach(logo => {
      logo.src = logoSrc;
    });
  }

  // Navigation
  setupNavigation() {
    // Set active navigation link
    const currentPage = this.getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `${currentPage}.html` || (currentPage === 'index' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Mobile Navigation
  setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Update toggle icon
        const icon = navToggle.textContent;
        navToggle.textContent = icon === '☰' ? '✕' : '☰';
      });
      
      // Close menu when clicking on links
      const navLinks = navMenu.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          navToggle.textContent = '☰';
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          navToggle.textContent = '☰';
        }
      });
    }
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
  }

  // Data Loading
  async loadData() {
    const dataFiles = ['settings', 'projects', 'career', 'education', 'certificates', 'skills'];
    
    for (const file of dataFiles) {
      try {
        const response = await fetch(`data/${file}.json`);
        if (response.ok) {
          this.data[file] = await response.json();
        } else {
          console.warn(`Could not load ${file}.json`);
        }
      } catch (error) {
        console.error(`Error loading ${file}.json:`, error);
      }
    }
  }

  // Page Content Loading
  async loadPageContent(page) {
    try {
      switch (page) {
        case 'index':
          this.renderHomePage();
          break;
        case 'projekte':
          this.renderProjectsPage();
          break;
        case 'karriere':
          this.renderCareerPage();
          break;
        case 'ausbildung':
          this.renderEducationPage();
          break;
        case 'zertifikate':
          this.renderCertificatesPage();
          break;
        case 'kenntnisse':
          this.renderSkillsPage();
          break;
        case 'kontakt':
          this.renderContactPage();
          break;
      }
    } catch (error) {
      console.error(`Error rendering ${page} page:`, error);
    }
  }

  // Home Page Rendering
  renderHomePage() {
    console.log('renderHomePage called');
    console.log('this.data.settings:', this.data.settings);
    
    if (!this.data.settings) {
      console.warn('No settings data available');
      return;
    }

    // Update hero section with data from settings.json
    const heroName = document.querySelector('.hero-name');
    const heroClaim = document.querySelector('.hero .claim');
    const heroDescription = document.querySelector('.hero .description');
    const profileImage = document.querySelector('.profile-image');
    
    console.log('Found elements:', { heroName, heroClaim, heroDescription, profileImage });
    
    // Update content if data is available, otherwise keep existing HTML content
    if (heroName && this.data.settings.name) {
      heroName.textContent = this.data.settings.name;
      console.log('Updated hero name to:', this.data.settings.name);
    }
    if (heroClaim && this.data.settings.claim) {
      // Convert \n to <br> tags for line breaks
      heroClaim.innerHTML = this.data.settings.claim.replace(/\n/g, '<br>');
      console.log('Updated hero claim to:', this.data.settings.claim);
    }
    if (heroDescription && this.data.settings.description) {
      heroDescription.textContent = this.data.settings.description;
    }
    
    if (profileImage && this.data.settings.profileImage) {
      profileImage.src = this.data.settings.profileImage;
      profileImage.alt = this.data.settings.name || 'Profile Image';
    }

    // Render project teasers (top 3)
    this.renderProjectTeasers();
    
    // Render skill highlights
    this.renderSkillHighlights();
  }

  renderProjectTeasers() {
    const container = document.querySelector('.project-teasers');
    if (!container || !this.data.projects) return;

    // Get featured projects and sort by featured number
    const featuredProjects = this.data.projects
      .filter(project => project.featured)
      .sort((a, b) => a.featured - b.featured);
    
    // If we don't have 3 featured projects, fallback to first 3
    const projectsToShow = featuredProjects.length >= 3 ? featuredProjects.slice(0, 3) : this.data.projects.slice(0, 3);
    
    container.innerHTML = projectsToShow.map((project, index) => this.createProjectTeaser(project, index)).join('');
  }

  createProjectTeaser(project, index) {
    return `
      <article class="card project-teaser" onclick="window.location.href='projekte.html#project-${project.id || index + 1}'">
        <h3>${project.title}</h3>
        <div class="project-role">${project.role}</div>
        <div class="project-tech-preview">
          ${project.tech.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          ${project.tech.length > 3 ? `<span class="tech-more">+${project.tech.length - 3}</span>` : ''}
        </div>
      </article>
    `;
  }

  renderSkillHighlights() {
    const container = document.querySelector('.skill-highlights');
    if (!container || !this.data.skills) return;

    // Check if we want word cloud or traditional cards
    if (container.classList.contains('word-cloud')) {
      this.renderWordCloud(container);
    } else {
      // Get top skills from each category
      const highlights = [];
      Object.entries(this.data.skills).forEach(([category, skills]) => {
        const topSkill = skills.sort((a, b) => b.level - a.level)[0];
        if (topSkill) {
          highlights.push({ ...topSkill, category });
        }
      });

      container.innerHTML = highlights.map(skill => `
        <div class="skill-highlight">
          <h4>${skill.name}</h4>
          <div class="skill-level">
            ${this.createSkillDots(skill.level)}
          </div>
          <span class="skill-level-text">Level ${skill.level}/5</span>
        </div>
      `).join('');
    }
  }

  renderWordCloud(container) {
    // Store all skills for filtering
    this.allSkills = [];
    Object.entries(this.data.skills).forEach(([category, skills]) => {
      skills.forEach(skill => {
        this.allSkills.push({ ...skill, category });
      });
    });

    // Remove duplicates and keep highest level
    const uniqueSkills = this.allSkills.reduce((acc, skill) => {
      const existing = acc.find(s => s.name.toLowerCase() === skill.name.toLowerCase());
      if (!existing || skill.level > existing.level) {
        if (existing) {
          acc = acc.filter(s => s !== existing);
        }
        acc.push(skill);
      }
      return acc;
    }, []);
    
    // Store for filtering
    this.uniqueSkills = uniqueSkills;
    
    // Render filter buttons
    this.renderSkillsFilter();
    
    // Render all skills initially
    this.renderFilteredSkills('all');
  }

  renderSkillsFilter() {
    const filterContainer = document.querySelector('.skills-filter .filter-tags');
    if (!filterContainer || !this.data.skills) return;

    // Clear existing buttons except ALLE
    const alleButton = filterContainer.querySelector('[data-category="all"]');
    if (alleButton) {
      filterContainer.innerHTML = '';
      filterContainer.appendChild(alleButton);
    }

    // Get category names
    const categories = Object.keys(this.data.skills);
    
    // Create filter buttons
    const filterButtons = categories.map(category => {
      const shortName = this.getCategoryShortName(category);
      return `<button class="filter-btn" data-category="${category}">${shortName}</button>`;
    }).join('');
    
    // Add buttons after ALLE button
    if (alleButton) {
      alleButton.insertAdjacentHTML('afterend', filterButtons);
    }
    
    // Add event listeners (only once)
    if (!filterContainer.hasAttribute('data-listeners-added')) {
      filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
          // Remove active from all buttons
          filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          // Add active to clicked button
          e.target.classList.add('active');
          // Filter skills
          this.renderFilteredSkills(e.target.dataset.category);
        }
      });
      filterContainer.setAttribute('data-listeners-added', 'true');
    }
  }

  getCategoryShortName(category) {
    const shortNames = {
      'Fachkompetenzen': 'FACHKOMPETENZEN',
      'Cloud & Infrastructure': 'CLOUD & INFRASTRUCTURE',
      'Softwareentwicklung': 'SOFTWAREENTWICKLUNG',
      'Methodenkompetenzen': 'METHODENKOMPETENZEN',
      'Security & Governance': 'SECURITY & GOVERNANCE',
      'Branchenkenntnisse': 'BRANCHENKENNTNISSE',
      'Leadership & Soft Skills': 'LEADERSHIP & SOFT SKILLS',
      'Business Development': 'BUSINESS DEVELOPMENT',
      'Innovation & KI': 'INNOVATION & KI',
      'Business Intelligence & Analytics': 'BUSINESS INTELLIGENCE & ANALYTICS',
      'Management & Consulting': 'MANAGEMENT & CONSULTING'
    };
    return shortNames[category] || category.toUpperCase();
  }

  renderFilteredSkills(selectedCategory) {
    const container = document.querySelector('.skill-highlights.word-cloud');
    if (!container) return;

    let skillsToShow = this.uniqueSkills;
    
    // Filter by category if not "all"
    if (selectedCategory !== 'all') {
      skillsToShow = this.uniqueSkills.filter(skill => skill.category === selectedCategory);
    }
    
    // Add/remove compact class based on selection
    if (selectedCategory === 'all') {
      container.classList.add('compact');
    } else {
      container.classList.remove('compact');
    }
    
    // Shuffle for better visual distribution
    const shuffledSkills = skillsToShow.sort(() => Math.random() - 0.5);
    
    container.innerHTML = shuffledSkills.map(skill => 
      `<span class="word-cloud-item level-${skill.level}" title="Level ${skill.level}/5 - ${skill.category}">${skill.name}</span>`
    ).join('');
  }


  // Projects Page
  renderProjectsPage() {
    const container = document.querySelector('.projects-grid');
    if (!container || !this.data.projects) return;

    container.innerHTML = this.data.projects.map((project, index) => this.createProjectCard(project, index)).join('');
    
    // Setup filters
    this.setupProjectFilters();
  }

  createProjectCard(project, index) {
    const projectId = project.id || index + 1;
    return `
      <article class="card project-card" id="project-${projectId}" data-category="${project.category}">
        <span class="project-icon">${project.icon}</span>
        <div class="project-category">${project.category}</div>
        <h3>${project.title}</h3>
        <div class="project-meta">
          <span class="project-role">${project.role}</span>
          <span class="project-period">${project.period}</span>
        </div>
        <p>${project.summary}</p>
        ${project.highlights ? `
          <ul class="project-highlights">
            ${project.highlights.slice(0, 3).map(highlight => `<li>${highlight}</li>`).join('')}
          </ul>
        ` : ''}
        <div class="tags">
          ${project.tech.slice(0, 4).map(tech => `<span class="tag tag-secondary">${tech}</span>`).join('')}
          ${project.tech.length > 4 ? `<span class="tag tag-more">+${project.tech.length - 4}</span>` : ''}
        </div>
      </article>
    `;
  }

  setupProjectFilters() {
    if (!this.data.projects) return;

    // Add event listeners to existing filter buttons
    const filterContainer = document.querySelector('.filter-tags');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag')) {
          const filter = e.target.dataset.filter;
          this.filterProjects(filter);
          
          // Update active state
          filterContainer.querySelectorAll('.filter-tag').forEach(tag => 
            tag.classList.remove('active')
          );
          e.target.classList.add('active');
        }
      });
    }
  }

  filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      if (category === 'ALL' || card.dataset.category === category) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.5s ease-in';
      } else {
        card.style.display = 'none';
      }
    });
  }

  applyFilters() {
    const activeTagFilters = Array.from(document.querySelectorAll('.filter-tag.active[data-value]'))
      .map(btn => btn.dataset.value);

    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      const project = this.data.projects[index];
      const shouldShow = activeTagFilters.length === 0 || 
        activeTagFilters.some(filter => 
          project.tags.includes(filter) || project.tech.includes(filter)
        );

      card.style.display = shouldShow ? 'block' : 'none';
    });
  }

  resetFilters() {
    document.querySelectorAll('.filter-tag.active').forEach(btn => {
      btn.classList.remove('active');
    });
    this.applyFilters();
  }

  // Career Page
  renderCareerPage() {
    const container = document.querySelector('.career-timeline');
    if (!container || !this.data.career) return;

    container.innerHTML = this.data.career.map(position => `
      <div class="timeline-item">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-company">${position.company}</h3>
            <p class="timeline-role">${position.role}</p>
          </div>
          <span class="timeline-period">${position.period}</span>
        </div>
        <ul class="timeline-achievements">
          ${position.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // Education Page
  renderEducationPage() {
    const container = document.querySelector('.education-list');
    if (!container || !this.data.education) return;

    // Group by type
    const grouped = this.data.education.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});

    container.innerHTML = Object.entries(grouped).map(([type, items]) => `
      <section class="education-section">
        <h2>${type}</h2>
        <div class="education-items">
          ${items.map(item => `
            <div class="card">
              <h3>${item.title}</h3>
              <p class="institution">${item.institution}</p>
              <p class="year">${item.year}</p>
              ${item.details ? `<p class="details">${item.details}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    `).join('');
  }

  // Certificates Page
  renderCertificatesPage() {
    const container = document.querySelector('.certificates-grid');
    if (!container || !this.data.certificates) return;

    container.innerHTML = this.data.certificates.map(cert => {
      // Map institution names to filter categories
      const categoryMap = {
        'Microsoft': 'MICROSOFT',
        'Microsoft Global Partner Solutions (GPS)': 'MICROSOFT',
        'Microsoft Cloud Sales Academy': 'MICROSOFT',
        'Amazon Web Services': 'AWS',
        'Amazon Web Services Training and Certification': 'AWS',
        'The Open Group': 'TOGAF',
        'Scrum.org': 'SCRUM.ORG'
      };
      
      const category = categoryMap[cert.institution] || cert.institution.toUpperCase();
      
      return `
        <div class="card certificate-card" data-category="${category}">
          ${cert.badgeImage ? `<div class="certificate-badge-image">
            <img src="${cert.badgeImage}" alt="${cert.title}" class="badge-image">
          </div>` : ''}
          <div class="certificate-header">
            <h3>${cert.title}</h3>
            <span class="certificate-year">${cert.year}</span>
          </div>
          <p class="certificate-institution">${cert.institution}</p>
          ${cert.details ? `<p class="certificate-details">${cert.details}</p>` : ''}
        </div>
      `;
    }).join('');

    // Setup certificate filters
    this.setupCertificateFilters();
  }

  setupCertificateFilters() {
    if (!this.data.certificates) return;

    // Add event listeners to filter buttons - same logic as projects
    const filterContainer = document.querySelector('.filter-tags');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag')) {
          const filter = e.target.dataset.filter;
          this.filterCertificates(filter);
          
          // Update active state - only one active at a time
          filterContainer.querySelectorAll('.filter-tag').forEach(tag => 
            tag.classList.remove('active')
          );
          e.target.classList.add('active');
        }
      });
    }
  }

  filterCertificates(category) {
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
      if (category === 'ALL' || card.dataset.category === category) {
        card.style.display = 'block'; // Block für Grid-Layout
        card.style.animation = 'fadeIn 0.5s ease-in';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Skills Page
  renderSkillsPage() {
    const container = document.querySelector('.skills-grid');
    if (!container || !this.data.skills) return;

    // Clear any existing content first
    container.innerHTML = '';
    
    container.innerHTML = Object.entries(this.data.skills).map(([category, skills]) => `
      <div class="skill-category">
        <h3>${category}</h3>
        <div class="skills-list">
          ${skills.map(skill => `
            <div class="skill-item">
              <span class="skill-name">${skill.name}</span>
              <div class="skill-level">
                ${this.createSkillDots(skill.level)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  createSkillDots(level) {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(`<span class="skill-dot ${i <= level ? 'active' : ''}"></span>`);
    }
    return dots.join('');
  }

  // Contact Page
  renderContactPage() {
    if (!this.data.settings) return;

    const emailLink = document.querySelector('.contact-email');
    const socialLinks = document.querySelector('.social-links');

    if (emailLink) {
      emailLink.href = `mailto:${this.data.settings.email}`;
      emailLink.textContent = this.data.settings.email;
    }

    if (socialLinks && this.data.settings.socials) {
      socialLinks.innerHTML = Object.entries(this.data.settings.socials).map(([platform, url]) => `
        <a href="${url}" class="social-link" target="_blank" rel="noopener noreferrer">
          ${this.getSocialIcon(platform)} ${platform}
        </a>
      `).join('');
    }
  }

  getSocialIcon(platform) {
    const icons = {
      github: '📧',
      linkedin: '💼',
      twitter: '🐦',
      email: '✉️'
    };
    return icons[platform] || '🔗';
  }

  // Event Listeners
  setupEventListeners() {
    // Smooth scrolling for anchor links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const navMenu = document.querySelector('.nav-menu');
      const navToggle = document.querySelector('.nav-toggle');
      
      if (navMenu && navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });

    // Add fade-in animation to cards on scroll
    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.card, .timeline-item, .skill-category').forEach(el => {
      observer.observe(el);
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PortfolioApp();
});

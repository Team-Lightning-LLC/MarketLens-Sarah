// Portfolio Pulse Integration
// Manages view toggling between Research Library and Portfolio Pulse

class PulseIntegration {
  constructor() {
    this.currentView = 'library'; // 'library' or 'pulse'
    this.init();
  }

  init() {
    this.setupToggle();
    this.initializePulseWidget();
  }

  setupToggle() {
    const libraryBtn = document.getElementById('viewLibrary');
    const pulseBtn = document.getElementById('viewPulse');

    if (libraryBtn) {
      libraryBtn.addEventListener('click', () => this.switchView('library'));
    }

    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => this.switchView('pulse'));
    }
  }

  switchView(view) {
    if (this.currentView === view) return;

    this.currentView = view;

    const libraryContainer = document.getElementById('libraryContainer');
    const pulseContainer = document.getElementById('pulseContainer');
    const libraryBtn = document.getElementById('viewLibrary');
    const pulseBtn = document.getElementById('viewPulse');

    if (view === 'library') {
      // Show library, hide pulse
      if (libraryContainer) libraryContainer.style.display = 'flex';
      if (pulseContainer) pulseContainer.style.display = 'none';
      
      // Update button states
      if (libraryBtn) libraryBtn.classList.add('active');
      if (pulseBtn) pulseBtn.classList.remove('active');

    } else if (view === 'pulse') {
      // Show pulse, hide library
      if (libraryContainer) libraryContainer.style.display = 'none';
      if (pulseContainer) pulseContainer.style.display = 'flex';
      
      // Update button states
      if (libraryBtn) libraryBtn.classList.remove('active');
      if (pulseBtn) pulseBtn.classList.add('active');

      // Initialize pulse widget if not already done
      if (!window.portfolioPulse) {
        this.initializePulseWidget();
      }
    }
  }

  initializePulseWidget() {
    // Only initialize once
    if (window.portfolioPulse) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        window.portfolioPulse = new PortfolioPulseWidget();
      });
    } else {
      window.portfolioPulse = new PortfolioPulseWidget();
    }
  }
}

// Initialize integration when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.pulseIntegration = new PulseIntegration();
});

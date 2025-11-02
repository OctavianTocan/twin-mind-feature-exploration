// TwinMind Demo Extension - Content Script
(function() {
  'use strict';

  const DEMO_SERVER_URL = 'http://localhost:3000';
  const MAX_RETRIES = 50;
  const RETRY_DELAY = 500;

  // TwinMind brand colors
  const COLORS = {
    primary: '#0b4f75',
    primaryHover: '#0a4268',
    text: '#4F4F4F',
    gray: '#646464',
    border: '#e5e7eb',
    white: '#ffffff'
  };

  // Create demo button element
  function createDemoButton(text, url, icon) {
    const button = document.createElement('button');
    button.className = 'twinmind-demo-btn';
    button.innerHTML = `
      <span class="demo-icon">${icon}</span>
      <span class="demo-text">${text}</span>
    `;
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(url, '_blank');
    });
    return button;
  }

  // Create demo section
  function createDemoSection() {
    const section = document.createElement('div');
    section.className = 'twinmind-demo-section';
    section.innerHTML = `
      <div class="demo-divider"></div>
      <div class="demo-header">Feature Demos</div>
    `;

    // Add demo buttons
    const connectorsBtn = createDemoButton(
      'Connectors',
      `${DEMO_SERVER_URL}/connectors.html`,
      '🔗'
    );
    
    const dictionaryBtn = createDemoButton(
      'Dictionary',
      `${DEMO_SERVER_URL}/dictionary.html`,
      '📝'
    );

    section.appendChild(connectorsBtn);
    section.appendChild(dictionaryBtn);

    return section;
  }

  // Inject CSS
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .twinmind-demo-section {
        border-top: 1px solid ${COLORS.border};
        padding: 8px 0;
        margin-top: 8px;
      }
      
      .demo-header {
        font-size: 12px;
        font-weight: 600;
        color: ${COLORS.gray};
        padding: 4px 16px;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .demo-divider {
        height: 1px;
        background: ${COLORS.border};
        margin-bottom: 8px;
      }
      
      .twinmind-demo-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
        background: ${COLORS.white};
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        font-size: 14px;
        color: ${COLORS.text};
      }
      
      .twinmind-demo-btn:hover {
        background: #f8fafc;
        transform: translateX(2px);
      }
      
      .twinmind-demo-btn:active {
        transform: translateX(1px);
      }
      
      .demo-icon {
        font-size: 16px;
        width: 20px;
        text-align: center;
      }
      
      .demo-text {
        flex: 1;
        font-weight: 500;
      }
      
      .demo-server-status {
        font-size: 11px;
        color: ${COLORS.gray};
        padding: 8px 16px;
        text-align: center;
        background: #fef3c7;
        border-radius: 6px;
        margin: 8px 0;
      }
      
      .demo-server-status.online {
        background: #d1fae5;
        color: #065f46;
      }
    `;
    document.head.appendChild(style);
  }

  // Check if local demo server is running
  async function checkDemoServer() {
    try {
      const response = await fetch(`${DEMO_SERVER_URL}/health`, {
        method: "GET",
        cache: "no-cache"
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Add server status indicator
  function addServerStatus(container, isOnline) {
    const status = document.createElement('div');
    status.className = `demo-server-status ${isOnline ? 'online' : ''}`;
    status.textContent = isOnline 
      ? '✓ Demo server running' 
      : '⚠ Start demo server: Open demo-server folder and run "npm start"';
    
    container.insertBefore(status, container.firstChild);
    return status;
  }

  // Find and inject into profile menu
  function findAndInjectMenu() {
    // Common selectors for profile menus
    const selectors = [
      '[data-testid="profile-menu"]',
      '[role="menu"]',
      '.profile-menu',
      '.user-menu',
      '[aria-label*="profile"]',
      '[aria-label*="menu"]',
      '.dropdown-menu',
      '.menu-dropdown'
    ];

    for (const selector of selectors) {
      const menu = document.querySelector(selector);
      if (menu) {
        console.log('Found menu:', selector);
        return menu;
      }
    }

    // Try to find any element that looks like a dropdown menu
    const possibleMenus = document.querySelectorAll('[role="menu"], .dropdown, .menu');
    for (const menu of possibleMenus) {
      if (menu.children.length > 0) {
        console.log('Found possible menu:', menu);
        return menu;
      }
    }

    return null;
  }

  // Inject demo buttons
  async function injectDemoButtons() {
    let menu = findAndInjectMenu();
    
    if (!menu) {
      console.log('Menu not found, will retry...');
      return false;
    }

    // Check if already injected
    if (menu.querySelector('.twinmind-demo-section')) {
      console.log('Demo buttons already injected');
      return true;
    }

    // Inject styles
    injectStyles();

    // Check server status
    const isServerOnline = await checkDemoServer();
    
    // Create demo section
    const demoSection = createDemoSection();
    
    // Add server status
    addServerStatus(demoSection, isServerOnline);
    
    // Insert into menu
    menu.appendChild(demoSection);
    
    console.log('Demo buttons injected successfully!');
    return true;
  }

  // Main injection logic with retries
  async function main() {
    let retries = 0;
    
    const tryInject = async () => {
      const success = await injectDemoButtons();
      
      if (!success && retries < MAX_RETRIES) {
        retries++;
        console.log(`Retrying injection (${retries}/${MAX_RETRIES})...`);
        setTimeout(tryInject, RETRY_DELAY);
      }
    };

    // Initial injection attempt
    setTimeout(tryInject, 1000);

    // Also try when user interacts (clicks profile button etc.)
    document.addEventListener('click', async (e) => {
      // Look for profile clicks
      if (e.target.closest('[data-testid="profile"], .profile, [aria-label*="profile"], .user-avatar')) {
        setTimeout(tryInject, 500);
      }
    }, true);

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(tryInject, 500);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }

})();

// TwinMind Demo Bookmarklet
(function() {
    'use strict';
    
    const DEMO_SERVER_URL = 'http://localhost:3000';
    
    // TwinMind brand colors
    const COLORS = {
        primary: '#0b4f75',
        primaryHover: '#0a4268',
        text: '#4F4F4F',
        gray: '#646464',
        border: '#e5e7eb',
        white: '#ffffff'
    };

    // Check if already injected
    if (document.querySelector('.twinmind-demo-section')) {
        alert('TwinMind Demo buttons already added! Refresh the page to remove them.');
        return;
    }

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
            
            /* Floating indicator */
            .twinmind-demo-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${COLORS.primary};
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(11, 79, 117, 0.3);
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Check if local demo server is running
    async function checkDemoServer() {
        try {
            const response = await fetch(`${DEMO_SERVER_URL}/connectors.html`, {
                method: 'HEAD',
                mode: 'no-cors'
            });
            return true;
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

    // Add floating indicator
    function addIndicator(isOnline) {
        const indicator = document.createElement('div');
        indicator.className = 'twinmind-demo-indicator';
        indicator.textContent = isOnline ? '🚀 Demo Ready' : '⚠️ Server Offline';
        document.body.appendChild(indicator);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 3000);
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

    // Main injection function
    async function injectDemoButtons() {
        let menu = findAndInjectMenu();
        
        if (!menu) {
            alert('Could not find profile menu. Please click your profile first, then try again.');
            return false;
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
        
        // Add floating indicator
        addIndicator(isServerOnline);
        
        console.log('Demo buttons injected successfully!');
        return true;
    }

    // Execute injection
    injectDemoButtons();

})();

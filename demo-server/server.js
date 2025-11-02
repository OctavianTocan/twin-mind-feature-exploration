const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the parent directory (where connectors.html and dictionary.html are)
app.use(express.static(path.join(__dirname, '..')));

// Enable CORS preflight
app.options('*', cors());

// Main route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>TwinMind Demo Server</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 40px 20px;
                background: #f8fafc;
                color: #334155;
            }
            .header {
                text-align: center;
                margin-bottom: 40px;
            }
            .header h1 {
                color: #0b4f75;
                margin-bottom: 10px;
            }
            .demo-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 40px;
            }
            .demo-card {
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .demo-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
            }
            .demo-card h3 {
                margin: 0 0 10px 0;
                color: #0b4f75;
            }
            .demo-card p {
                margin: 0 0 16px 0;
                color: #64748b;
            }
            .demo-btn {
                display: inline-block;
                background: #0b4f75;
                color: white;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 6px;
                font-weight: 500;
                transition: background 0.2s;
            }
            .demo-btn:hover {
                background: #0a4268;
            }
            .status {
                background: #d1fae5;
                color: #065f46;
                padding: 16px;
                border-radius: 8px;
                margin-bottom: 20px;
                border-left: 4px solid #10b981;
            }
            .instructions {
                background: #f3f4f6;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
            }
            .instructions h3 {
                margin-top: 0;
                color: #374151;
            }
            .instructions code {
                background: #e5e7eb;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🚀 TwinMind Demo Server</h1>
            <p>Local development server for TwinMind feature demos</p>
        </div>

        <div class="status">
            ✅ Demo server is running successfully on port ${PORT}
        </div>

        <div class="demo-grid">
            <div class="demo-card">
                <h3>🔗 Connectors Demo</h3>
                <p>Service integrations interface with toggle switches for Google Drive, OneDrive, Outlook, Gmail, and Google Calendar.</p>
                <a href="/connectors.html" class="demo-btn" target="_blank">Open Demo</a>
            </div>

            <div class="demo-card">
                <h3>📝 Dictionary Demo</h3>
                <p>Word and correction management system with add/edit/delete functionality for improving transcription accuracy.</p>
                <a href="/dictionary.html" class="demo-btn" target="_blank">Open Demo</a>
            </div>
        </div>

        <div class="instructions">
            <h3>📋 Demo Instructions:</h3>
            <ol>
                <li>Install the <strong>TwinMind Demo Extension</strong> in Chrome</li>
                <li>Navigate to <strong>app.twinmind.com</strong> and log in</li>
                <li>Click your profile to see the demo buttons</li>
                <li>Click any demo button to open the feature demos</li>
            </ol>
            
            <h3>🛠 Extension Installation:</h3>
            <ol>
                <li>Open Chrome and go to <code>chrome://extensions/</code></li>
                <li>Enable "Developer mode" (top right)</li>
                <li>Click "Load unpacked" and select the <code>demo-extension</code> folder</li>
                <li>The extension will appear in your toolbar</li>
            </ol>
        </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TwinMind Demo Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving demos from: ${path.join(__dirname, '..')}`);
  console.log('');
  console.log('Available demos:');
  console.log('  🔗 Connectors: http://localhost:3000/connectors.html');
  console.log('  📝 Dictionary: http://localhost:3000/dictionary.html');
  console.log('');
  console.log('📋 Next steps:');
  console.log('  1. Install the browser extension (demo-extension folder)');
  console.log('  2. Go to app.twinmind.com and log in');
  console.log('  3. Click your profile to see demo buttons');
});

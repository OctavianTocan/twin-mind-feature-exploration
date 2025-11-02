# 🚀 TwinMind Demo Setup

Complete demo setup for showcasing Connectors and Dictionary features to TwinMind developers.

## 📋 Quick Start

### Option 1: Browser Extension (Recommended)
1. **Start the demo server:**
   ```bash
   cd demo-server
   npm install
   npm start
   ```

2. **Install the Chrome extension:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked" and select the `demo-extension` folder
   - The extension will appear in your toolbar

3. **Use the demo:**
   - Navigate to `app.twinmind.com` and log in
   - Click your profile to see the demo buttons
   - Click "Connectors" or "Dictionary" to open the demos

### Option 2: Bookmarklet (Quick Alternative)
1. **Start the demo server** (same as above)
2. **Install the bookmarklet:**
   - Copy the bookmarklet URL from `bookmarklet/bookmarklet-url.txt`
   - Right-click your bookmarks bar → "Add page"
   - Name it "TwinMind Demo" and paste the URL
3. **Use the demo:**
   - Go to `app.twinmind.com` and log in
   - Click your profile to open the menu
   - Click the "TwinMind Demo" bookmarklet
   - Demo buttons will be added to the menu

## 🎯 Demo Features

### 🔗 Connectors Demo
- **Location:** `http://localhost:3000/connectors.html`
- **Features:**
  - Service integration cards for Google Drive, OneDrive, Outlook, Gmail, Google Calendar
  - Interactive toggle switches with smooth animations
  - Hover effects and micro-interactions
  - Mobile-responsive design
  - TwinMind-branded styling

### 📝 Dictionary Demo
- **Location:** `http://localhost:3000/dictionary.html`
- **Features:**
  - Add/edit/delete word entries
  - Support for simple words and spelling corrections
  - Modal dialogs for desktop, inline form for mobile
  - Live list updates
  - Professional UI matching TwinMind design

## 🛠 Technical Details

### Browser Extension Features
- **Automatic detection** of TwinMind profile menus
- **Real-time server status** checking
- **Smart retry logic** with DOM observation
- **TwinMind brand colors** (#0b4f75 primary)
- **Smooth animations** and transitions
- **Cross-browser compatibility** (Chrome, Edge, Firefox)

### Local Server Features
- **CORS-enabled** for cross-origin requests
- **Health check endpoint** at `/health`
- **Beautiful landing page** at `http://localhost:3000`
- **Static file serving** for demo pages
- **Development-friendly** logging

## 📁 File Structure

```
TwinMind-Improvements-Project/
├── connectors.html              # Connectors demo page
├── dictionary.html              # Dictionary demo page
├── icons/                      # Service icons
├── demo-extension/              # Chrome extension
│   ├── manifest.json           # Extension config
│   ├── content.js             # Main injection script
│   ├── styles.css             # Extension styles
│   ├── popup.html             # Extension popup
│   └── popup.js              # Popup logic
├── demo-server/               # Local server
│   ├── package.json           # Server dependencies
│   └── server.js             # Express server
├── bookmarklet/               # Bookmarklet backup
│   ├── demo-bookmarklet.js    # Bookmarklet source
│   └── bookmarklet-url.txt   # Minified bookmarklet URL
└── README.md                 # This file
```

## 🎨 Design System

### Colors
- **Primary:** `#0b4f75` (TwinMind blue)
- **Primary Hover:** `#0a4268`
- **Text:** `#4F4F4F`
- **Gray:** `#646464`
- **Border:** `#e5e7eb`
- **White:** `#ffffff`

### Typography
- **Font:** Inter, system-ui fallback
- **Headings:** Helvetica Neue (for titles)
- **Sizes:** Responsive scaling from mobile to desktop

### Interactions
- **Hover:** Subtle background color change + transform
- **Active:** Reduced transform for tactile feedback
- **Transitions:** 0.2s ease for smooth animations

## 🔧 Troubleshooting

### Extension not working?
1. **Check server status:** Ensure demo server is running on port 3000
2. **Reload extension:** Go to `chrome://extensions/` and click reload
3. **Refresh TwinMind:** Hard refresh the TwinMind page (Ctrl+Shift+R)
4. **Check console:** Open DevTools to see extension logs

### Bookmarklet not working?
1. **Copy full URL:** Ensure you copied the entire `javascript:` URL
2. **Profile menu open:** Click your profile first, then use bookmarklet
3. **Server running:** Verify demo server is running locally
4. **Browser permissions:** Ensure bookmarks bar is enabled

### Server not starting?
1. **Node.js required:** Install Node.js from nodejs.org
2. **Port conflict:** Check if port 3000 is in use
3. **Dependencies:** Run `npm install` in demo-server folder
4. **Permissions:** Ensure folder has read/write permissions

## 🎯 Demo Script for Monday

1. **Preparation (5 minutes):**
   - Start demo server: `cd demo-server && npm start`
   - Install browser extension if not already done
   - Test both demos open correctly

2. **Demo Flow (10 minutes):**
   - Navigate to `app.twinmind.com`
   - Show current TwinMind interface
   - Click profile to reveal demo buttons
   - Open Connectors demo → explain service integrations
   - Open Dictionary demo → show word management
   - Switch between TwinMind and demos seamlessly

3. **Key Talking Points:**
   - **Native integration:** Buttons appear directly in TwinMind UI
   - **Consistent design:** Matches TwinMind's visual language
   - **Professional polish:** Smooth animations and interactions
   - **Mobile responsive:** Works on all device sizes
   - **Easy implementation:** Simple extension architecture

## 🚀 Ready for Demo!

Your demo setup is now complete! The extension will automatically add demo buttons to TwinMind's profile menu, providing seamless access to your feature demonstrations.

Good luck with your Monday demo! 🎉

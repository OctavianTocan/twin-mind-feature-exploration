# TwinMind Overlay Injection

The browser extension injects two menu items into TwinMind’s left-side personalization dropdown and shows full-page overlays for Connectors and Dictionary directly over app.twinmind.com. No local server required.

## Quick Start

### Install the Chrome extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked" and select the `demo-extension` folder
4. The extension will appear in your toolbar

### Use the overlay

1. Navigate to `https://app.twinmind.com` and log in
2. Click your profile (top-left) to open the menu
3. New items "Connectors" and "Dictionary" should appear at the bottom
4. Click either to open a full-page overlay with a dark backdrop
5. Close with Back/Save in the header, by clicking the backdrop, or pressing ESC

## Overlay Features

### Connectors

- TwinMind-styled connector cards for Google Drive, OneDrive, Outlook, Gmail, Google Calendar
- Toggles with keyboard support and smooth animations
- Mobile-first layout centered within a raised panel

### Dictionary

- Add/edit/delete entries; supports words and spelling corrections
- Desktop modal + mobile inline form
- Keyboard-accessible toggles and controls

## Technical Details

### Extension Behavior

- Injects menu items by cloning the existing menu item prototype for styling parity
- Robust menu detection with multiple selector strategies and detailed console logs
- Smart retry logic (50 retries, 500ms) + MutationObserver to detect late-rendered menus
- Full-page overlay with semi-transparent backdrop and body scroll lock
- Loads `connectors.html` and `dictionary.html` from the extension package via `chrome.runtime.getURL`
- Rewrites icon URLs to the extension’s `icons/` path and injects Tailwind CDN when missing

## File Structure

```
twin-mind-feature-exploration/
├── demo-extension/              # Chrome extension
│   ├── manifest.json           # Extension config
│   ├── content.js             # Main injection script
│   ├── styles.css             # Extension styles
│   ├── connectors.html         # Connectors overlay (loaded by extension)
│   ├── dictionary.html         # Dictionary overlay (loaded by extension)
│   ├── icons/                  # Extension icons
│   ├── styles/                 # Extension CSS
│   │   └── site.css           # Shared styles
│   ├── popup.html             # Extension popup
│   └── popup.js              # Popup logic
├── docs/                       # GitHub Pages demo
│   ├── connectors.html         # Standalone connectors page
│   ├── dictionary.html         # Standalone dictionary page
│   ├── icons/                  # Service icons (Gmail, Drive, etc.)
│   ├── styles/                 # Shared CSS
│   │   └── site.css           # Design tokens and utilities
│   └── transcript.html         # Demo transcript page
├── bookmarklet/               # Previous bookmarklet implementation
│   ├── demo-bookmarklet.js    # Bookmarklet source
│   └── bookmarklet-url.txt    # Minified bookmarklet URL
├── reference-screenshots/      # Design reference images
├── .github/
│   └── copilot-instructions.md # AI agent instructions
└── README.md                  # This file
```

## Design System

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

## Troubleshooting

### Menu items not appearing

1. Open DevTools Console on `app.twinmind.com`
2. Click your profile picture to open the menu
3. Look for logs prefixed with `[TwinMind Ext]` detailing which selector matched
4. Right‑click the “Personalization” menu item → Inspect → In Elements, find the container wrapping all menu items and note its role/id/classes
5. Refresh the page and try again; the extension tries several strategies

### Overlay not closing

- Press ESC or click outside the panel on the dark backdrop
- Click the Back or Save buttons in the header (both are wired to close)

### Icons missing

- Ensure the extension is loaded with the `icons/` folder present
- Reload the extension and page

## Additional Information

### GitHub Pages Demo

The `docs/` directory contains standalone HTML pages that can be viewed directly via GitHub Pages or a local web server. These pages include the TwinMind iframe background for visual context during development.

### Extension vs. Standalone Pages

- **Extension**: Loads HTML from `demo-extension/` and injects it as an overlay into the live TwinMind app
- **Standalone**: Pages in `docs/` can be opened directly for development and preview
- Both share the same CSS design tokens in their respective `styles/site.css` files

### Development Workflow

1. **Preview standalone pages**: Open files in `docs/` directly or use a local server
2. **Test extension**: Load `demo-extension/` as an unpacked extension in Chrome
3. **Sync changes**: Keep both `demo-extension/` and `docs/` versions in sync when making UI changes

Load the extension, open TwinMind, and use the injected menu items to launch immersive overlays that mirror the production UI—no local server needed.

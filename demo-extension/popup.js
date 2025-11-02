// TwinMind Demo Extension - Popup Script
document.addEventListener('DOMContentLoaded', async function() {
  const DEMO_SERVER_URL = 'http://localhost:3000';
  
  const statusEl = document.getElementById('status');
  const connectorsBtn = document.getElementById('connectorsBtn');
  const dictionaryBtn = document.getElementById('dictionaryBtn');
  
  // Check if demo server is running
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
  
  // Update UI based on server status
  async function updateStatus() {
    const isOnline = await checkDemoServer();
    
    if (isOnline) {
      statusEl.className = 'status online';
      statusEl.textContent = '✅ Demo server is running';
      connectorsBtn.disabled = false;
      dictionaryBtn.disabled = false;
    } else {
      statusEl.className = 'status offline';
      statusEl.textContent = '⚠️ Demo server is offline';
      connectorsBtn.disabled = true;
      dictionaryBtn.disabled = true;
    }
  }
  
  // Open demo page
  function openDemo(page) {
    chrome.tabs.create({ url: `${DEMO_SERVER_URL}/${page}.html` });
  }
  
  // Event listeners
  connectorsBtn.addEventListener('click', () => openDemo('connectors'));
  dictionaryBtn.addEventListener('click', () => openDemo('dictionary'));
  
  // Initial status check
  updateStatus();
  
  // Check status every 3 seconds
  setInterval(updateStatus, 3000);
});

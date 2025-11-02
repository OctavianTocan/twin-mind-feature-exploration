// Fixed server detection function  
async function checkDemoServer() {  
  try {  
    const response = await fetch(`${DEMO_SERVER_URL}/health`, {  
      method: 'GET',  
      cache: 'no-cache'  
    });  
    return response.ok;  
  } catch (error) {  
    return false;  
  }  
} 

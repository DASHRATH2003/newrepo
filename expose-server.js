const ngrok = require('ngrok');
const fs = require('fs');

async function startNgrok() {
  try {
    // Connect to ngrok and expose the local server
    const url = await ngrok.connect({
      addr: 5000, // Your local server port
      region: 'us', // or 'eu', 'au', 'ap', 'sa', 'jp', 'in'
    });
    
    console.log(`
    ✅ NGROK TUNNEL CREATED SUCCESSFULLY!
    
    🌐 Public URL: ${url}
    🔗 Local URL: http://localhost:5000
    
    📝 IMPORTANT: Update your Vercel frontend to use this URL:
    1. Go to your Vercel dashboard
    2. Open Environment Variables for your project
    3. Add/update REACT_APP_API_URL with: ${url}
    4. Redeploy your frontend
    
    ⚠️ NOTE: This URL will change each time you restart ngrok.
    ⚠️ This is a temporary solution for testing only.
    `);
    
    // Save the URL to a file for reference
    fs.writeFileSync('ngrok-url.txt', `
    NGROK Public URL: ${url}
    Generated at: ${new Date().toISOString()}
    
    This URL will be valid until you stop this script or restart your computer.
    Use this URL in your frontend configuration for testing.
    `);
    
    console.log('URL saved to ngrok-url.txt');
    
  } catch (error) {
    console.error('Error starting ngrok:', error);
  }
}

startNgrok();

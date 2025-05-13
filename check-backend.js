/**
 * This script checks if the backend server is running and provides helpful information.
 * 
 * Usage:
 * node check-backend.js
 */

const http = require('http');
const https = require('https');

// URLs to check
const localBackendUrl = 'http://localhost:5000/api/test';
const productionBackendUrl = 'https://champions-hr-backend.onrender.com/api/test';

console.log('🔍 Checking backend servers...\n');

// Function to make an HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Check local backend
console.log('Checking local backend...');
makeRequest(localBackendUrl)
  .then(response => {
    console.log('✅ Local backend is running!');
    console.log(`Status: ${response.status}`);
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.log('❌ Local backend is not running!');
    console.log(`Error: ${error.message}`);
    console.log('\nTo start the local backend, run:');
    console.log('cd pitcs/pitcs_backend');
    console.log('npm start');
  })
  .finally(() => {
    console.log('\n-----------------------------------\n');
    
    // Check production backend
    console.log('Checking production backend...');
    makeRequest(productionBackendUrl)
      .then(response => {
        console.log('✅ Production backend is running!');
        console.log(`Status: ${response.status}`);
        console.log('Response:', response.data);
        
        console.log('\n✨ Recommendation:');
        console.log('Since the local backend is not running, you should use the production backend.');
        console.log('The application has been configured to use the production backend by default.');
        console.log('You can toggle between backends using the DevTools component (🛠️ icon).');
      })
      .catch(error => {
        console.log('❌ Production backend is not running!');
        console.log(`Error: ${error.message}`);
        
        console.log('\n⚠️ Warning:');
        console.log('Both local and production backends are not accessible.');
        console.log('Please check your internet connection and the backend server status.');
      });
  });

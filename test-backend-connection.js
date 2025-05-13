/**
 * This script tests the connection to the backend server.
 * It makes a simple GET request to the /api/jobs endpoint.
 *
 * Usage:
 * node test-backend-connection.js
 */

const https = require('https');

// Backend URLs to test
const urls = [
  'https://champions-hr-services-5.onrender.com/api/jobs',
  'https://champions-hr-services-5.onrender.com/api/test',
  'https://champions-hr-backend.onrender.com/api/jobs',
  'https://champions-hr-backend.onrender.com/api/test'
];

// Test each URL
urls.forEach(backendUrl => {
  testUrl(backendUrl);
});

function testUrl(backendUrl) {

console.log(`🔍 Testing connection to: ${backendUrl}\n`);

// Make a GET request to the backend
https.get(backendUrl, (res) => {
  let data = '';

  // A chunk of data has been received
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received
  res.on('end', () => {
    console.log(`✅ Connection successful!`);
    console.log(`Status code: ${res.statusCode}`);

    try {
      const parsedData = JSON.parse(data);
      console.log(`\nResponse data (first 2 items):`);
      console.log(JSON.stringify(parsedData.slice(0, 2), null, 2));
      console.log(`\nTotal items: ${parsedData.length}`);
    } catch (e) {
      console.log(`\nResponse data (raw):`);
      console.log(data.substring(0, 500) + (data.length > 500 ? '...' : ''));
    }

    console.log('\n✨ Your backend is accessible!');
    console.log('You can now use the application with the production backend.');
  });
}).on('error', (err) => {
  console.log(`❌ Connection failed!`);
  console.log(`Error: ${err.message}`);

  if (err.code === 'ENOTFOUND') {
    console.log('\n⚠️ The backend URL could not be resolved.');
    console.log('This could be due to:');
    console.log('1. The URL is incorrect');
    console.log('2. DNS issues');
    console.log('3. No internet connection');
  } else if (err.code === 'ECONNREFUSED') {
    console.log('\n⚠️ The connection was refused.');
    console.log('This could be due to:');
    console.log('1. The backend server is not running');
    console.log('2. The port is incorrect');
    console.log('3. A firewall is blocking the connection');
  } else {
    console.log('\n⚠️ An unknown error occurred.');
    console.log('This could be due to:');
    console.log('1. Network connectivity issues');
    console.log('2. The backend server is down');
    console.log('3. CORS issues (though this script bypasses CORS)');
  }

  console.log('\n🔍 Trying an alternative approach...');

  // Try using the fetch API if available (Node.js 18+)
  try {
    const nodeFetch = require('node-fetch');

    nodeFetch(backendUrl)
      .then(response => {
        console.log(`✅ Connection successful with node-fetch!`);
        console.log(`Status code: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log(`\nResponse data (first 2 items):`);
        console.log(JSON.stringify(data.slice(0, 2), null, 2));
        console.log(`\nTotal items: ${data.length}`);

        console.log('\n✨ Your backend is accessible!');
        console.log('You can now use the application with the production backend.');
      })
      .catch(error => {
        console.log(`❌ Connection also failed with node-fetch!`);
        console.log(`Error: ${error.message}`);
      });
  } catch (e) {
    console.log(`❌ Could not use alternative approach (node-fetch not available).`);

    console.log('\n📋 Recommendations:');
    console.log('1. Check if the backend URL is correct');
    console.log('2. Check if the backend server is running');
    console.log('3. Check your internet connection');
    console.log('4. Try accessing the URL in a browser');
  }
});
}

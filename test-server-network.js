// This is a Node.js script to test the connection to your backend server from other devices
const http = require('http');

// Configuration - CHANGE THIS TO YOUR COMPUTER'S IP ADDRESS
const SERVER_HOST = '192.168.1.30'; // Replace with your computer's IP address
const SERVER_PORT = 5000;
const API_ENDPOINT = '/api/send-email';

// Test data
const testData = {
  name: 'Network Test User',
  email: 'network-test@example.com',
  option: 'Network Test Option',
  contact: '9876543210',
  message: 'This is a test message from another device on the network',
  timestamp: new Date().toISOString()
};

// Convert data to JSON string
const postData = JSON.stringify(testData);

// Request options
const options = {
  hostname: SERVER_HOST,
  port: SERVER_PORT,
  path: API_ENDPOINT,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log(`Sending request to http://${SERVER_HOST}:${SERVER_PORT}${API_ENDPOINT}`);
console.log('Request data:', testData);

// Make the request
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(responseData);
      console.log('Response data:', parsedData);
      
      if (parsedData.success) {
        console.log('✅ Test successful! The server is accessible from other devices on the network.');
      } else {
        console.log('❌ Test failed. The server returned an error.');
      }
    } catch (e) {
      console.error('Error parsing response:', e.message);
      console.log('Raw response:', responseData);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Request failed: ${e.message}`);
  
  if (e.code === 'ECONNREFUSED') {
    console.log('\nPossible reasons:');
    console.log('1. The server is not running');
    console.log('2. The server is running on a different port');
    console.log('3. There\'s a firewall blocking the connection');
    console.log('4. The IP address is incorrect');
    console.log('\nTry:');
    console.log('1. Make sure the server is running (node server.js)');
    console.log('2. Check if the port is correct (currently using port 5000)');
    console.log('3. Check if there\'s a firewall blocking the connection');
    console.log('4. Verify the IP address is correct (currently using ' + SERVER_HOST + ')');
  }
});

// Write data to request body
req.write(postData);
req.end();

console.log('Request sent, waiting for response...');

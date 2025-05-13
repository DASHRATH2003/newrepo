const http = require('http');

const data = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  option: 'Looking for a Job',
  contact: '1234567890',
  message: 'This is a test message',
  timestamp: new Date().toISOString()
});

// Replace '192.168.1.30' with your actual server IP address
const SERVER_IP = '192.168.1.30'; // Change this to your server's IP address

const options = {
  hostname: SERVER_IP, // Using server IP instead of localhost
  port: 5000,
  path: '/api/send-email',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });

  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();

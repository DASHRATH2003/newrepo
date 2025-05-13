const http = require('http');
const fs = require('fs');

// Create a log file
fs.writeFileSync('server-log.txt', 'Server starting...\n');

// Function to log messages
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  console.log(message);
  fs.appendFileSync('server-log.txt', logMessage);
}

// Create the server
const server = http.createServer((req, res) => {
  // Log request details
  log(`Request received: ${req.method} ${req.url}`);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    log('Handling OPTIONS request (preflight)');
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle POST requests to /api/send-email
  if (req.method === 'POST' && req.url === '/api/send-email') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        log(`Form data received: ${JSON.stringify(data)}`);

        // Send success response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Email sent successfully!'
        }));

        log('Success response sent');
      } catch (error) {
        log(`Error parsing JSON: ${error.message}`);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid JSON'
        }));
      }
    });
  } else {
    // Handle all other requests
    log(`Unhandled request: ${req.method} ${req.url}`);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: false,
      error: 'Not found'
    }));
  }
});

// Start the server
const PORT = 5000;
const HOST = '0.0.0.0'; // Listen on all available network interfaces
server.listen(PORT, HOST, () => {
  log(`Server running at http://${HOST}:${PORT}/`);
  log(`For local access use: http://localhost:${PORT}/`);

  // Try to get the server's IP address
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        log(`For network access use: http://${net.address}:${PORT}/`);
      }
    }
  }
});

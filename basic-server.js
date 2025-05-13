const http = require('http');
const fs = require('fs');

// Create a log function
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  // Log to console
  console.log(message);

  // Append to log file
  fs.appendFileSync('server.log', logMessage);
}

const server = http.createServer((req, res) => {
  // Handle CORS for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'POST' && req.url === '/api/send-email') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Received form data: ' + JSON.stringify(data));

        // Send success response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
      }
    });
  } else {
    // Handle all other requests
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
const express = require('express');
const http = require('http');

// ---------------------
// Backend Server (Express)
// ---------------------
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);

  // ---------------------
  // HTTP Client Request (Node.js native)
  // ---------------------
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`\n📡 STATUS: ${res.statusCode}`);
    console.log(`📎 HEADERS: ${JSON.stringify(res.headers)}`);

    res.on('data', (chunk) => {
      console.log(`📦 BODY: ${chunk}`);
    });

    res.on('end', () => {
      console.log('✅ No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Problem with request: ${e.message}`);
  });

  req.end();
});

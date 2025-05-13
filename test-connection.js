const http = require('http');

// Function to test connection to a server
function testConnection(host, port, path, callback) {
  const options = {
    hostname: host,
    port: port,
    path: path,
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`BODY: ${data}`);
      callback(null, { statusCode: res.statusCode, headers: res.headers, body: data });
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
    callback(e);
  });

  req.end();
}

// Test connection to localhost:3001
console.log('Testing connection to localhost:3001...');
testConnection('localhost', 3001, '/', (error, response) => {
  if (error) {
    console.error('Connection failed:', error.message);
  } else {
    console.log('Connection successful!');
  }
  
  // Test connection to localhost:5000
  console.log('\nTesting connection to localhost:5000...');
  testConnection('localhost', 5000, '/', (error, response) => {
    if (error) {
      console.error('Connection failed:', error.message);
    } else {
      console.log('Connection successful!');
    }
  });
});

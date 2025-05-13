const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json());

// Simple email endpoint that always returns success
app.post('/api/send-email', (req, res) => {
  console.log('Received form data:', req.body);
  res.status(200).json({ success: true });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

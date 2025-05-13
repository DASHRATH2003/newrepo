const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const os = require('os');

const app = express();
// Use environment variable for port (required for cloud hosting)
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration for global access
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Handle preflight requests explicitly
app.options('*', cors());

// Add explicit CORS headers to all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());

// Setup transporter with detailed configuration
// Use environment variables for credentials in production
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER || 'dashrathkumardbg2003@gmail.com',
    pass: process.env.EMAIL_PASS || 'yvot ykux zyjv rchx'
  },
  tls: {
    rejectUnauthorized: false // Helps with some connection issues
  }
});

// Verify the transporter connection
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ SMTP connection error:', error);
  } else {
    console.log('✅ Server is ready to send emails');
  }
});

// POST route to send email
app.post('/api/send-email', async (req, res) => {
  console.log('📨 Received email request:', req.body);
  const { name, email, option, contact, message, timestamp } = req.body;

  // Create both HTML and plain text versions for better email client compatibility
  const htmlContent = `
    <h2>New Inquiry from Website</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact:</strong> ${contact}</p>
    <p><strong>Option:</strong> ${option}</p>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>Timestamp:</strong> ${timestamp}</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'dashrathkumardbg2003@gmail.com',
    replyTo: email, // Set reply-to as the user's email
    to: process.env.EMAIL_TO || 'dashrathsirt34@gmail.com',
    subject: `New Website Inquiry: ${option} from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Contact: ${contact}
      Option: ${option}
      Message: ${message}
      Timestamp: ${timestamp}
    `,
    html: htmlContent
  };

  try {
    console.log('📤 Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Email sending failed', 
      error: err.message 
    });
  }
});

// Simple jobs endpoint
app.get('/api/jobs', (req, res) => {
  res.status(200).json([
    { id: 1, title: 'Software Developer', location: 'Remote', description: 'Full-stack developer position' },
    { id: 2, title: 'UI/UX Designer', location: 'Mumbai', description: 'Design user interfaces' },
    { id: 3, title: 'Project Manager', location: 'Delhi', description: 'Manage software development projects' }
  ]);
});

// Add a test endpoint to verify the server is running
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running correctly',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint (important for cloud hosting)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`💻 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Log local access URL
  console.log(`🔗 Local URL: http://localhost:${PORT}`);
  
  // Log network IPs (only useful in development)
  if (process.env.NODE_ENV !== 'production') {
    try {
      const nets = os.networkInterfaces();
      Object.values(nets).flat().forEach(net => {
        if (net.family === 'IPv4' && !net.internal) {
          console.log(`🌐 Network URL: http://${net.address}:${PORT}`);
        }
      });
    } catch (err) {
      console.error('Could not determine network IP:', err);
    }
  }
});

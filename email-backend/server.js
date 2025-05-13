/**
 * Email Server for Champions HR Services
 * 
 * This server provides an API endpoint for sending emails from the contact form.
 */

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://champion-hr-service.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow all origins in development
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Add explicit CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Parse JSON request bodies
app.use(bodyParser.json());

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
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

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  console.log('📨 Received email request:', req.body);
  
  try {
    const { name, email, option, contact, message, timestamp } = req.body;
    
    // Validate required fields
    if (!name || !email || !option || !contact || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Create email content
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Option:</strong> ${option}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Timestamp:</strong> ${timestamp || new Date().toISOString()}</p>
    `;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission: ${option} from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Option: ${option}
        Contact: ${contact}
        Message: ${message}
        Timestamp: ${timestamp || new Date().toISOString()}
      `,
      html: htmlContent
    };
    
    // Send the email
    console.log('📤 Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    // Return error response
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// Test endpoint to verify the server is running
app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`💻 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Email API available at http://localhost:${PORT}/api/send-email`);
  console.log(`🔗 Test API available at http://localhost:${PORT}/api/test`);
});

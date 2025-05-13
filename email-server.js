/**
 * Simple Express server to handle email sending
 * 
 * This server provides an API endpoint for sending emails from the contact form.
 * It can be run locally for testing or deployed to a service like Render.com.
 */

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: '*', // In production, you should restrict this to your frontend domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(bodyParser.json());

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dashrathkumardbg2003@gmail.com', // Replace with your email
    pass: 'yvot ykux zyjv rchx' // Replace with your app password
  }
});

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  try {
    console.log('Received email request:', req.body);
    
    const { name, email, option, contact, message, timestamp } = req.body;
    
    // Validate required fields
    if (!name || !email || !option || !contact || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Create email content
    const mailOptions = {
      from: 'dashrathkumardbg2003@gmail.com', // Replace with your email
      to: 'dashrathsirt34@gmail.com', // Replace with recipient email
      subject: `New Contact Form Submission: ${option} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Option:</strong> ${option}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Timestamp:</strong> ${timestamp || new Date().toISOString()}</p>
      `
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
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

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email API available at http://localhost:${PORT}/api/send-email`);
  console.log(`Test API available at http://localhost:${PORT}/api/test`);
});

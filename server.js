const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const os = require('os');

const app = express();
const PORT = 5000;

// CORS setup
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dashrathkumardbg2003@gmail.com',
    pass: 'yvot ykux zyjv rchx' // Use Gmail App Password here
  }
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP error:', error);
  } else {
    console.log('✅ SMTP server ready');
  }
});

// API to send email
app.post('/api/send-email', async (req, res) => {
  const { name, email, option, contact, message, timestamp } = req.body;

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
    from: 'dashrathkumardbg2003@gmail.com',
    to: 'dashrathsirt34@gmail.com',
    subject: `New Website Inquiry: ${option} from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nContact: ${contact}\nOption: ${option}\nMessage: ${message}\nTimestamp: ${timestamp}`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('❌ Email error:', err);
    res.status(500).json({ success: false, message: 'Email failed', error: err.message });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Server is running correctly' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Log network IPs
  const nets = os.networkInterfaces();
  Object.values(nets).flat().forEach(net => {
    if (net.family === 'IPv4' && !net.internal) {
      console.log(`🌐 Network access: http://${net.address}:${PORT}`);
    }
  });
});

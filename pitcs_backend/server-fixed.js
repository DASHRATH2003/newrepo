const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

// Load environment variables manually
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    if (key && value) {
      acc[key] = value;
    }
  }
  return acc;
}, {});

// Set environment variables
Object.keys(envVars).forEach(key => {
  process.env[key] = envVars[key];
});

console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('EMAIL:', process.env.EMAIL);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '******' : 'undefined');

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5174", "https://champions-hr-services.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Simplified Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Email endpoint
// Add this after creating the transporter
transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP connection error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

// Modify the email endpoint
app.post("/api/send-email", async (req, res) => {
  try {
    console.log("Received request with data:", req.body);

    const mailOptions = {
      from: process.env.EMAIL,
      to: "championshrservices@gmail.com",
      subject: "New Form Submission",
      html: `
        <h3>New Contact Form Submission</h3>
        ${Object.entries(req.body).map(([key, value]) =>
          `<p><strong>${key}:</strong> ${value}</p>`
        ).join('')}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Full error stack:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.response || error
    });
  }
});

app.use("/api/jobs", require("./routes/jobs"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

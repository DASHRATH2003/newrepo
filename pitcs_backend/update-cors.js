/**
 * This script updates the CORS configuration for the backend server.
 * It adds the specified origins to the allowed origins list.
 * 
 * Usage:
 * node update-cors.js [origins...]
 * 
 * Example:
 * node update-cors.js http://localhost:3000 https://champion-hr-service.vercel.app
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get the origins from command line arguments
const newOrigins = process.argv.slice(2);

if (newOrigins.length === 0) {
  console.error('❌ Error: No origins specified');
  console.log('Usage: node update-cors.js [origins...]');
  console.log('Example: node update-cors.js http://localhost:3000 https://champion-hr-service.vercel.app');
  process.exit(1);
}

// Path to .env file
const envPath = path.resolve(__dirname, '.env');

// Read the .env file
let envContent;
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (err) {
  console.error(`❌ Error reading .env file: ${err.message}`);
  process.exit(1);
}

// Parse the current allowed origins
const allowedOriginsMatch = envContent.match(/ALLOWED_ORIGINS=(.+)/);
let currentOrigins = [];

if (allowedOriginsMatch && allowedOriginsMatch[1]) {
  currentOrigins = allowedOriginsMatch[1].split(',');
}

console.log('📋 Current allowed origins:');
if (currentOrigins.length === 0) {
  console.log('   None');
} else {
  currentOrigins.forEach(origin => console.log(`   - ${origin}`));
}

// Add new origins if they don't already exist
const originsToAdd = newOrigins.filter(origin => !currentOrigins.includes(origin));

if (originsToAdd.length === 0) {
  console.log('✅ All specified origins are already allowed');
  process.exit(0);
}

console.log('\n📝 Adding new origins:');
originsToAdd.forEach(origin => console.log(`   + ${origin}`));

// Combine current and new origins
const updatedOrigins = [...currentOrigins, ...originsToAdd];

// Update the .env file
let updatedEnvContent;
if (allowedOriginsMatch) {
  // Replace the existing ALLOWED_ORIGINS line
  updatedEnvContent = envContent.replace(
    /ALLOWED_ORIGINS=.+/,
    `ALLOWED_ORIGINS=${updatedOrigins.join(',')}`
  );
} else {
  // Add a new ALLOWED_ORIGINS line
  updatedEnvContent = envContent + `\nALLOWED_ORIGINS=${updatedOrigins.join(',')}\n`;
}

// Write the updated .env file
try {
  fs.writeFileSync(envPath, updatedEnvContent);
  console.log('\n✅ Successfully updated CORS configuration');
  console.log('\n📋 New allowed origins:');
  updatedOrigins.forEach(origin => console.log(`   - ${origin}`));
} catch (err) {
  console.error(`❌ Error writing .env file: ${err.message}`);
  process.exit(1);
}

console.log('\n🔄 Restart your server for the changes to take effect');

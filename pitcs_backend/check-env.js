require('dotenv').config();
console.log('Environment variables:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('EMAIL:', process.env.EMAIL);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

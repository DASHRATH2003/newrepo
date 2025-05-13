/**
 * Mock Email Service
 * 
 * This module provides a mock implementation of the email service
 * for use when the actual email server is not available.
 */

// Mock function to simulate sending an email
export const sendEmail = async (formData) => {
  console.log('📧 Mock Email Service: Sending email with data:', formData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate successful response
  return {
    success: true,
    message: 'Email sent successfully (mock)',
    timestamp: new Date().toISOString()
  };
};

// Export the mock service
export default {
  sendEmail
};

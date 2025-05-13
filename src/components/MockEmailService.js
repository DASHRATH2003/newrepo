/**
 * Mock Email Service
 *
 * This module provides a mock implementation of the email service
 * since there is no backend server for email handling.
 *
 * In a production environment, you would replace this with actual API calls
 * to a backend service or a third-party email service like SendGrid, Mailchimp, etc.
 */

// Mock function to simulate sending an email
export const sendEmail = async (formData) => {
  console.log('📧 Mock Email Service: Sending email with data:', formData);

  // Log the form data for debugging
  console.log('Name:', formData.name);
  console.log('Email:', formData.email);
  console.log('Option:', formData.option);
  console.log('Contact:', formData.contact);
  console.log('Message:', formData.message);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate successful response
  return {
    success: true,
    message: 'Your message has been received. This is a mock response as there is no backend server.',
    timestamp: new Date().toISOString()
  };
};

/**
 * In a real application, you would implement actual email sending here.
 * For example, using a service like EmailJS which can send emails directly
 * from the frontend without a backend:
 *
 * import emailjs from 'emailjs-com';
 *
 * export const sendEmail = async (formData) => {
 *   try {
 *     const result = await emailjs.send(
 *       'YOUR_SERVICE_ID',
 *       'YOUR_TEMPLATE_ID',
 *       formData,
 *       'YOUR_USER_ID'
 *     );
 *     return { success: true, message: 'Email sent successfully' };
 *   } catch (error) {
 *     console.error('Email error:', error);
 *     return { success: false, message: 'Failed to send email' };
 *   }
 * };
 */

// Export the mock service
const mockEmailService = {
  sendEmail
};

export default mockEmailService;

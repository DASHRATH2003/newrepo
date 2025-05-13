// Configuration file for application settings

/**
 * This configuration file contains application settings.
 * Since we've removed the backend, this file is simplified.
 * In a real application, you might use this for:
 * - Feature flags
 * - UI configuration
 * - Third-party service URLs (like EmailJS, Firebase, etc.)
 */

// Get the current hostname for environment detection
const hostname = window.location.hostname;

// Initialize configuration
let APP_ENV;

// Determine environment
if (hostname.includes('vercel.app')) {
  APP_ENV = 'production';
  console.log('📱 Running on Vercel - Production environment');
}
else if (hostname === 'www.championshrservices.com' || hostname === 'championshrservices.com') {
  APP_ENV = 'production';
  console.log('🌐 Running on production domain');
}
else if (hostname === 'localhost' || hostname === '127.0.0.1') {
  APP_ENV = 'development';
  console.log('💻 Running in development environment');
}
else {
  APP_ENV = 'production';
  console.log('⚠️ Unknown environment - defaulting to production');
}

// Create a config object to export
const config = {
  APP_ENV,
  // Add any other configuration values here
  COMPANY_NAME: 'Champions HR Services',
  CONTACT_EMAIL: 'info@championshrservices.com',
  CONTACT_PHONE: '+91 1234567890',
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/championshrservices',
    LINKEDIN: 'https://linkedin.com/company/champions-hr-services',
    TWITTER: 'https://twitter.com/championshr'
  },
  // Mock API URL since we removed the backend
  API_BASE_URL: ''
};

export default config;

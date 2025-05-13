// Configuration file for API endpoints and other settings

/**
 * This configuration file determines the API base URL based on the current environment.
 * It handles different scenarios:
 * 1. Vercel deployment - uses relative URLs that are handled by vercel.json rewrites
 * 2. Custom domain - uses the production backend URL
 * 3. Local development - uses localhost or production backend based on user preference
 * 4. Network access - uses the server's IP address
 */

// Get the current hostname
const hostname = window.location.hostname;

// Define backend URLs
// Use the correct production backend URL
const PRODUCTION_BACKEND_URL = 'https://champions-hr-services-5.onrender.com';
const LOCAL_BACKEND_URL = 'http://localhost:5000';
const NETWORK_BACKEND_URL = 'http://192.168.1.30:5000'; // Replace with your actual IP

// Always use production backend to avoid connection issues
// This ensures the application works even if the local backend is not running
if (typeof localStorage !== 'undefined') {
  localStorage.setItem('useProductionBackend', 'true');
}
const useProductionBackend = true;

// Initialize API base URL
let API_BASE_URL;

// Determine environment and set appropriate API URL
if (hostname.includes('vercel.app')) {
  // 1. Vercel deployment - use empty base URL for relative paths
  // This works with the rewrites in vercel.json
  API_BASE_URL = '';
  console.log('📱 Running on Vercel - using relative URLs');
}
else if (hostname === 'www.championshrservices.com' || hostname === 'championshrservices.com') {
  // 2. Production on custom domain
  API_BASE_URL = PRODUCTION_BACKEND_URL;
  console.log('🌐 Running on production domain - using production backend');
}
else if (hostname === 'localhost' || hostname === '127.0.0.1') {
  // 3. Local development on same machine
  if (useProductionBackend) {
    API_BASE_URL = PRODUCTION_BACKEND_URL;
    console.log('💻 Running locally - using production backend (user preference)');
  } else {
    API_BASE_URL = LOCAL_BACKEND_URL;
    console.log('💻 Running locally - using localhost backend');
  }
}
else if (hostname.match(/^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
  // 4. Local network access (matches common private IP ranges)
  API_BASE_URL = NETWORK_BACKEND_URL;
  console.log('🔌 Running on local network - using network IP');
}
else {
  // 5. Default fallback
  API_BASE_URL = PRODUCTION_BACKEND_URL;
  console.log('⚠️ Unknown environment - using production backend as fallback');
}

// Create a config object to export
const config = {
  API_BASE_URL,
};

export default config;

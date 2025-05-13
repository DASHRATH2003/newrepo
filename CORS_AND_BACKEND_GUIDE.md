# CORS and Backend Configuration Guide

This guide explains how to handle CORS issues and configure your backend for different environments.

## Understanding CORS

CORS (Cross-Origin Resource Sharing) is a security feature implemented by browsers that restricts web pages from making requests to a different domain than the one that served the web page.

### Common CORS Error

```
Access to XMLHttpRequest at 'https://champions-hr-backend.onrender.com/api/jobs' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This error occurs when your frontend (running on `http://localhost:3000`) tries to access your backend API (running on `https://champions-hr-backend.onrender.com`) but the backend server doesn't have the proper CORS headers configured.

## Solutions

### 1. Update Backend CORS Configuration

The best solution is to update your backend CORS configuration to allow requests from your frontend domain.

#### Using the update-cors.js Script

We've created a script to help you update the CORS configuration:

```bash
cd pitcs/pitcs_backend
node update-cors.js http://localhost:3000 https://champion-hr-service.vercel.app
```

This will add `http://localhost:3000` and `https://champion-hr-service.vercel.app` to the allowed origins in your `.env` file.

#### Manual Update

You can also manually update the `.env` file:

```
ALLOWED_ORIGINS=http://localhost:3000,https://champion-hr-service.vercel.app
```

After updating the `.env` file, restart your backend server for the changes to take effect.

### 2. Use the DevTools Toggle

We've added a DevTools component that allows you to toggle between local and production backends during development:

1. Look for the 🛠️ icon in the bottom-left corner of your application
2. Click it to open the DevTools panel
3. Use the toggle switch to switch between local and production backends
4. The page will reload automatically to apply the changes

### 3. Deploy Your Backend to Render.com

For a permanent solution, deploy your backend to Render.com:

1. Follow the instructions in the `DEPLOYMENT_GUIDE.md` file
2. Make sure to set the `ALLOWED_ORIGINS` environment variable in Render.com
3. Update your frontend configuration to use the deployed backend URL

## Backend Configuration in config.js

The `config.js` file determines which backend URL to use based on the current environment:

```javascript
// Define backend URLs
const PRODUCTION_BACKEND_URL = 'https://champions-hr-backend.onrender.com';
const LOCAL_BACKEND_URL = 'http://localhost:5000';
const NETWORK_BACKEND_URL = 'http://192.168.1.30:5000'; // Replace with your actual IP

// Check if user has selected to use production backend in local development
// Default to true (use production backend) if not set
const useProductionBackend = localStorage.getItem('useProductionBackend') !== 'false';

// Determine environment and set appropriate API URL
if (hostname.includes('vercel.app')) {
  // Vercel deployment - use empty base URL for relative paths
  API_BASE_URL = '';
}
else if (hostname === 'localhost' || hostname === '127.0.0.1') {
  // Local development on same machine
  if (useProductionBackend) {
    API_BASE_URL = PRODUCTION_BACKEND_URL;
  } else {
    API_BASE_URL = LOCAL_BACKEND_URL;
  }
}
// ... other environments
```

> **Note:** By default, the application is configured to use the production backend when running locally. This ensures that the application works out of the box without requiring you to run the local backend server.

## Testing Your Configuration

### Using the check-backend.js Script

We've created a script to help you check if your backend servers are running:

```bash
cd pitcs
node check-backend.js
```

This script will:
1. Check if your local backend server is running
2. Check if the production backend server is accessible
3. Provide recommendations based on the results

### Using the test-deployment.html File

You can also test your configuration using the `test-deployment.html` file:

1. Open the file in your browser
2. Use the tabs to test different environments:
   - Local Test: Tests your local backend
   - Production Test: Tests your production backend
   - Custom Test: Tests a custom backend URL

## Troubleshooting

### Backend Server Not Running

If you're using the local backend but it's not running:

1. Start the backend server:
   ```bash
   cd pitcs/pitcs_backend
   npm start
   ```

2. Make sure it's running on port 5000

### CORS Issues Persist

If CORS issues persist:

1. Check the Network tab in your browser's developer tools
2. Look for the OPTIONS request (preflight request)
3. Check if it's returning a 200 status code
4. If not, check your backend CORS configuration

### Email Sending Issues

If email sending doesn't work:

1. Check if your Gmail account allows less secure apps
2. Try generating a new app password for Gmail
3. Update the `.env` file with the new password

## Best Practices

1. **Use Environment Variables**: Store sensitive information in environment variables
2. **Test Both Environments**: Regularly test both local and production environments
3. **Keep CORS Configuration Updated**: Update your CORS configuration when adding new frontend domains
4. **Use the DevTools**: Use the DevTools component to quickly switch between environments during development

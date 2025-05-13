# Vercel Deployment Guide

This guide will help you deploy your application to Vercel so it works correctly on all devices.

## Step 1: Prepare Your Repository

1. Make sure your code is in a GitHub repository
2. Ensure the following files are in your repository:
   - `vercel.json` (for API routing and CORS configuration)
   - Updated `` (for proper API URL handling)
   - All other application files

## Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account
2. Click "Add New..." and select "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Create React App
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: build
5. Click "Deploy"

## Step 3: Verify the Deployment

1. Once deployed, Vercel will provide you with a URL (e.g., https://champion-hr-service.vercel.app)
2. Open this URL in your browser
3. Test the form submission functionality
4. Check if emails are being sent correctly

## Step 4: Fix Common Issues

### If the form submission doesn't work:

1. **Check the Network Tab in Developer Tools**:
   - Open your browser's developer tools (F12)
   - Go to the Network tab
   - Submit the form and look for the API request
   - Check if there are any errors

2. **Verify Vercel Configuration**:
   - Go to your Vercel project dashboard
   - Click on "Settings" > "Git"
   - Make sure the `vercel.json` file is being used

3. **Check Backend Connectivity**:
   - Make sure your backend server (on Render.com) is running
   - Verify that the URL in `vercel.json` is correct
   - Test the backend directly with a tool like Postman

### If you see icon errors:

1. Make sure the `icon.png` file exists in your `public` folder
2. Update the `manifest.json` file to reference the correct icon

## Important Files

### vercel.json
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://champions-hr-services-5.onrender.com/api/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-Requested-With, Content-Type, Accept, Authorization"
        },
        {
          "key": "Access-Control-Allow-Credentials",
          "value": "true"
        }
      ]
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### config.js
```javascript
// Configuration file for API endpoints and other settings

// Get the current hostname
const hostname = window.location.hostname;

// Base URL for API calls
let API_BASE_URL;

// Check if we're in a production environment (Vercel or custom domain)
const isVercel = hostname.includes('vercel.app');
const isCustomDomain = hostname === 'www.championshrservices.com' ||
                      hostname === 'championshrservices.com';
const isProduction = isVercel || isCustomDomain;

// IMPORTANT: For Vercel deployment, we use an empty base URL
// This allows the API calls to be handled by the rewrites in vercel.json
if (isProduction) {
  // In production (Vercel or custom domain), use the deployed backend
  // For Vercel, this will be handled by rewrites in vercel.json
  if (isVercel) {
    // When on Vercel, use relative URLs that will be handled by rewrites
    API_BASE_URL = '';
  } else {
    // When on custom domain, use the actual backend URL
    API_BASE_URL = 'https://champions-hr-services-5.onrender.com';
  }
} else if (hostname === 'localhost' || hostname === '127.0.0.1') {
  // Local development on the same machine
  API_BASE_URL = 'http://localhost:5000';
} else {
  // Development from another device on the network
  API_BASE_URL = 'http://192.168.1.30:5000'; // Replace with your actual server IP
}

// Export configuration
export default {
  API_BASE_URL,
};
```

## How It Works

1. When your application is deployed to Vercel, the `config.js` file detects that it's running on Vercel and sets `API_BASE_URL` to an empty string.

2. This causes API calls to use relative URLs like `/api/send-email` instead of absolute URLs like `http://localhost:5000/api/send-email`.

3. The `vercel.json` file contains rewrites that redirect these API requests to your backend server on Render.com.

4. This approach allows your frontend and backend to communicate even though they're hosted on different platforms.

## Need Help?

If you continue to have issues with your deployment, check:
1. Vercel deployment logs for any errors
2. Backend server logs on Render.com
3. Network requests in your browser's developer tools

# Deployment Guide

This guide explains how to deploy the application so it works correctly on both your local machine and when accessed from other devices.

## Local Development

1. **Start the backend server:**
   ```
   cd pitcs_backend
   node server.js
   ```

2. **Start the frontend application:**
   ```
   npm start
   ```

3. **Access the application:**
   - Local: http://localhost:3000
   - From other devices on your network: http://YOUR_IP_ADDRESS:3000

## Deploying to Vercel

### Step 1: Deploy the Backend to Render.com

1. Create a new account on [Render.com](https://render.com) if you don't have one
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Name: champions-hr-services
   - Root Directory: pitcs_backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add environment variables:
     - EMAIL: your Gmail address
     - EMAIL_PASSWORD: your Gmail app password

5. Click "Create Web Service"
6. Note the URL of your deployed backend (e.g., https://champions-hr-services-5.onrender.com)

### Step 2: Update the Vercel Configuration

1. Make sure the `vercel.json` file is in your project root with the following content:
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
             "value": "X-Requested-With, Content-Type, Accept"
           }
         ]
       }
     ]
   }
   ```

2. Update the destination URL in `vercel.json` to match your Render.com backend URL

### Step 3: Deploy the Frontend to Vercel

1. Create a new account on [Vercel](https://vercel.com) if you don't have one
2. Create a new project
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Create React App
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: build

5. Click "Deploy"

### Step 4: Test the Deployment

1. Once deployed, Vercel will provide you with a URL for your application
2. Open this URL in your browser
3. Test the form submission functionality
4. Check if emails are being sent correctly

## Troubleshooting

### CORS Issues

If you encounter CORS errors:

1. Make sure your backend server has CORS properly configured:
   ```javascript
   app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
   }));
   ```

2. Check that the Vercel rewrites are correctly configured in `vercel.json`

### Email Sending Issues

If emails are not being sent:

1. Check the backend server logs for any error messages
2. Verify your Gmail account settings:
   - Make sure "Less secure app access" is enabled
   - Verify that your app password is correct
   - Check if you need to complete a CAPTCHA: https://accounts.google.com/DisplayUnlockCaptcha

3. Try sending a test email using the test-email.html page

### Connection Issues

If the frontend cannot connect to the backend:

1. Check that the API_BASE_URL in config.js is correctly configured
2. Verify that the backend server is running and accessible
3. Check for any firewall or network restrictions

## Important Notes

1. The `vercel.json` configuration uses rewrites to proxy API requests to your backend server
2. The empty API_BASE_URL in config.js for production allows the frontend to use relative URLs
3. This setup keeps your frontend and backend separate while allowing them to communicate

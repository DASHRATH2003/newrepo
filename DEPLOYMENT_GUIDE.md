# Champions HR Services - Deployment Guide

This guide provides step-by-step instructions for deploying both the frontend and backend components of the Champions HR Services application.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Backend Deployment (Render.com)](#backend-deployment-rendercom)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Testing the Deployment](#testing-the-deployment)
5. [Troubleshooting](#troubleshooting)

## Local Development Setup

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd pitcs/pitcs_backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   PORT=5000
   NODE_ENV=development
   EMAIL_USER=dashrathkumardbg2003@gmail.com
   EMAIL_PASS=yvot ykux zyjv rchx
   EMAIL_TO=dashrathsirt34@gmail.com
   ALLOWED_ORIGINS=http://localhost:3000,https://champion-hr-service.vercel.app
   ```

4. Start the backend server:
   ```
   npm start
   ```

5. The server should be running at http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd pitcs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

4. The frontend should be running at http://localhost:3000

## Backend Deployment (Render.com)

### Step 1: Prepare Your Repository

1. Create a new GitHub repository for your backend code
2. Push your backend code to this repository:
   ```
   cd pitcs/pitcs_backend
   git init
   git add .
   git commit -m "Initial backend setup"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy to Render.com

1. Sign up for a free account at [Render.com](https://render.com)
2. Click on "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: champions-hr-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add environment variables:
   - Click on "Environment" tab
   - Add the following variables:
     - `NODE_ENV`: production
     - `PORT`: 10000 (Render will override this, but it's good to have)
     - `EMAIL_USER`: dashrathkumardbg2003@gmail.com
     - `EMAIL_PASS`: yvot ykux zyjv rchx
     - `EMAIL_TO`: dashrathsirt34@gmail.com
     - `ALLOWED_ORIGINS`: https://champion-hr-service.vercel.app,https://championshrservices.com

6. Click "Create Web Service"

7. Wait for the deployment to complete (this may take a few minutes)

8. Note the URL of your deployed backend (e.g., https://champions-hr-backend.onrender.com)

## Frontend Deployment (Vercel)

### Step 1: Prepare Your Repository

1. Create a new GitHub repository for your frontend code
2. Push your frontend code to this repository:
   ```
   cd pitcs
   git init
   git add .
   git commit -m "Initial frontend setup"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Update Configuration Files

1. Update `src/config.js` to use your Render.com backend URL:
   ```javascript
   const PRODUCTION_BACKEND_URL = 'https://champions-hr-backend.onrender.com';
   ```

2. Update `vercel.json` to use your Render.com backend URL:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://champions-hr-backend.onrender.com/api/:path*"
       }
     ],
     ...
   }
   ```

### Step 3: Deploy to Vercel

1. Sign up for a free account at [Vercel](https://vercel.com)
2. Click on "Add New..." and select "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: build

5. Click "Deploy"

6. Wait for the deployment to complete

7. Your frontend should now be accessible at a URL like https://champion-hr-service.vercel.app

## Testing the Deployment

### Test the Backend

1. Test the backend API by visiting:
   - `https://champions-hr-backend.onrender.com/api/test`
   - You should see a JSON response with `"success": true`

2. Test the email functionality using a tool like Postman:
   - URL: `https://champions-hr-backend.onrender.com/api/send-email`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "option": "Test Option",
       "contact": "1234567890",
       "message": "This is a test message",
       "timestamp": "2023-05-09T12:00:00.000Z"
     }
     ```

### Test the Frontend

1. Visit your Vercel deployment URL (e.g., https://champion-hr-service.vercel.app)
2. Test the form submission functionality
3. Check if emails are being sent correctly

## Troubleshooting

### Backend Issues

1. **Deployment Fails**:
   - Check the build logs on Render.com
   - Make sure all dependencies are listed in package.json
   - Verify the start command is correct

2. **Email Sending Fails**:
   - Check if the environment variables are set correctly
   - Verify that your Gmail account allows less secure apps
   - Try generating a new app password for Gmail

3. **CORS Issues**:
   - Check the CORS configuration in server.js
   - Make sure your frontend domain is allowed in the ALLOWED_ORIGINS environment variable

### Frontend Issues

1. **API Calls Fail**:
   - Check the Network tab in browser developer tools
   - Verify that the API_BASE_URL is set correctly in config.js
   - Make sure the vercel.json file is correctly configured

2. **Deployment Fails**:
   - Check the build logs on Vercel
   - Make sure all dependencies are listed in package.json
   - Verify the build command is correct

3. **Form Submission Issues**:
   - Check the console for any errors
   - Verify that the form is correctly submitting to the API
   - Check if the backend is receiving the request

## Important Notes

1. **Free Tier Limitations**:
   - Render's free tier will spin down after 15 minutes of inactivity
   - The first request after inactivity may take a few seconds to respond
   - Consider upgrading to a paid plan for production use

2. **Security**:
   - Never commit sensitive information like email passwords to Git
   - Always use environment variables for credentials
   - Consider using a service like SendGrid instead of Gmail for production

3. **Custom Domain**:
   - You can add a custom domain to both your Render and Vercel services
   - Follow their respective documentation for setting up custom domains

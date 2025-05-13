# Email Server Deployment Guide

This guide provides step-by-step instructions for deploying the Champions HR Email Server to Render.com.

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following content:
   ```
   PORT=5000
   EMAIL_USER=dashrathkumardbg2003@gmail.com
   EMAIL_PASS=yvot ykux zyjv rchx
   EMAIL_TO=dashrathsirt34@gmail.com
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002,https://champion-hr-service.vercel.app
   ```

3. Start the server:
   ```
   npm start
   ```

4. The server will be available at:
   - Email API: http://localhost:5000/api/send-email
   - Test API: http://localhost:5000/api/test

## Deployment to Render.com

### Step 1: Prepare Your Repository

1. Create a new GitHub repository for your email server
2. Push your email server code to this repository:
   ```
   git init
   git add .
   git commit -m "Initial email server setup"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy to Render.com

1. Sign up for a free account at [Render.com](https://render.com)
2. Click on "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: champions-hr-email-server
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add environment variables:
   - Click on "Environment" tab
   - Add the following variables:
     - `PORT`: 10000 (Render will override this, but it's good to have)
     - `NODE_ENV`: production
     - `EMAIL_USER`: dashrathkumardbg2003@gmail.com
     - `EMAIL_PASS`: yvot ykux zyjv rchx
     - `EMAIL_TO`: dashrathsirt34@gmail.com
     - `ALLOWED_ORIGINS`: https://champion-hr-service.vercel.app

6. Click "Create Web Service"

7. Wait for the deployment to complete (this may take a few minutes)

8. Note the URL of your deployed email server (e.g., https://champions-hr-email-server.onrender.com)

### Step 3: Update Your Frontend Configuration

1. Update `vercel.json` to use your Render.com email server URL:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/send-email",
         "destination": "https://champions-hr-email-server.onrender.com/api/send-email"
       },
       {
         "source": "/api/:path*",
         "destination": "https://champions-hr-services-5.onrender.com/api/:path*"
       }
     ],
     ...
   }
   ```

2. Deploy your frontend to Vercel

## Testing the Deployment

1. Test the email server by visiting:
   - `https://champions-hr-email-server.onrender.com/api/test`
   - You should see a JSON response with `"success": true`

2. Test the email functionality using the test-email-form.html page:
   - Update the server URL to your Render.com email server URL
   - Send a test email and check if it works

## Troubleshooting

### Email Sending Issues

1. **SMTP Authentication Error**:
   - Check if your Gmail account allows less secure apps
   - Try generating a new app password for Gmail
   - Update the `EMAIL_PASS` environment variable with the new password

2. **CORS Issues**:
   - Check if your frontend domain is included in the `ALLOWED_ORIGINS` environment variable
   - Check the Network tab in your browser's developer tools for CORS errors

3. **Server Not Responding**:
   - Check if the server is running on Render.com
   - Check the logs on Render.com for any errors

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
   - You can add a custom domain to your Render service
   - This requires a paid plan
   - Follow Render's documentation for setting up a custom domain

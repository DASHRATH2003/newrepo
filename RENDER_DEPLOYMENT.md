# Deploying Your Backend to Render.com

This guide will help you deploy your backend server to Render.com so it's accessible globally from the internet.

## Step 1: Prepare Your Files

1. Make sure you have the following files:
   - `cloud-server.js` - The server file optimized for cloud deployment
   - `backend-package.json` - The package.json file for the backend

2. Rename `backend-package.json` to `package.json`:
   ```
   rename backend-package.json package.json
   ```

3. Create a new folder for the backend (optional but recommended):
   ```
   mkdir champions-hr-backend
   copy cloud-server.js champions-hr-backend\
   copy package.json champions-hr-backend\
   ```

## Step 2: Create a GitHub Repository

1. Create a new repository on GitHub
2. Initialize a Git repository in your backend folder:
   ```
   cd champions-hr-backend
   git init
   git add .
   git commit -m "Initial backend setup"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

## Step 3: Deploy to Render.com

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
     - `EMAIL_USER`: dashrathkumardbg2003@gmail.com
     - `EMAIL_PASS`: yvot ykux zyjv rchx
     - `EMAIL_TO`: dashrathsirt34@gmail.com

6. Click "Create Web Service"

## Step 4: Update Your Frontend Configuration

Once your backend is deployed, Render will provide you with a URL like `https://champions-hr-backend.onrender.com`.

Update your frontend configuration to use this URL:

1. Open `pitcs/src/config.js`
2. Update the production URL to your Render URL:

```javascript
// 2. Production on Custom Domain
else if (
  hostname === 'www.championshrservices.com' ||
  hostname === 'championshrservices.com'
) {
  API_BASE_URL = 'https://champions-hr-backend.onrender.com';
}
```

3. Also update the vercel.json file:

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

## Step 5: Test Your Deployment

1. Wait for the deployment to complete (this may take a few minutes)
2. Test your backend API by visiting:
   - `https://champions-hr-backend.onrender.com/api/test`
   - You should see a JSON response with `"success": true`

3. Test the email functionality using a tool like Postman or the test-email.html page:
   - Update the URL to point to your Render deployment
   - Send a test email and check if it works

## Troubleshooting

If you encounter any issues:

1. **Deployment Fails**:
   - Check the build logs on Render.com
   - Make sure all dependencies are listed in package.json
   - Verify the start command is correct

2. **Email Sending Fails**:
   - Check if the environment variables are set correctly
   - Verify that your Gmail account allows less secure apps
   - Try generating a new app password for Gmail

3. **CORS Issues**:
   - Check the CORS configuration in cloud-server.js
   - Make sure your frontend domain is allowed

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

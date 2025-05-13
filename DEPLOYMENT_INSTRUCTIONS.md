# Deployment Instructions

This document provides instructions for deploying the Champions HR Services website.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- Vercel account (for deployment)

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/champions-hr-services.git
   cd champions-hr-services
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application will be available at http://localhost:3000

## Building for Production

1. Create a production build:
   ```
   npm run build
   ```

2. The build files will be available in the `build` directory

## Deployment to Vercel

### Option 1: Deploy from Git Repository

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Vercel account
3. Click "New Project"
4. Import your Git repository
5. Configure the project:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
6. Click "Deploy"

### Option 2: Deploy from Local Directory

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. Follow the prompts to configure your deployment

## Environment Variables

No environment variables are required for this project since it uses mock data and EmailJS for the contact form.

## Troubleshooting

### Git Permission Issues

If you encounter Git permission issues, refer to the `GIT_PERMISSIONS_FIX.md` file for instructions on how to fix them.

### Deployment Issues

If you encounter issues during deployment:

1. Ensure your Node.js version is compatible with Vercel
2. Check the Vercel deployment logs for errors
3. Verify that all dependencies are correctly installed

## Post-Deployment Tasks

After deploying the website:

1. Test the contact form to ensure EmailJS is working correctly
2. Verify that all pages are loading properly
3. Check the responsive design on different devices
4. Update the DNS settings if you're using a custom domain

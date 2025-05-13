# DevTools Guide

This guide explains how to use the DevTools component to switch between local and production backends during development.

## What is the DevTools Component?

The DevTools component is a small panel that appears in the bottom-left corner of your application when running in development mode. It allows you to:

- Toggle between local and production backends
- Test the backend connection
- See information about the current environment

## How to Use the DevTools Component

1. **Open the DevTools Panel**:
   - Look for the 🛠️ icon in the bottom-left corner of your application
   - Click it to open the DevTools panel

2. **Toggle Between Backends**:
   - Use the toggle switch to switch between local and production backends
   - The page will reload automatically to apply the changes

3. **Test the Backend Connection**:
   - Click the "Test Backend Connection" button to test if the backend is accessible
   - A popup will show the result of the test

## Default Configuration

By default, the application is configured to use the production backend when running locally. This ensures that the application works out of the box without requiring you to run the local backend server.

If you want to use the local backend:

1. Start the local backend server:
   ```bash
   cd pitcs/pitcs_backend
   npm start
   ```

2. Use the DevTools component to switch to the local backend

## Troubleshooting

### DevTools Not Appearing

If the DevTools component doesn't appear:

1. Make sure you're running the application in development mode (`npm start`)
2. Check if you're on localhost (the DevTools only appear in development)
3. Look for the 🛠️ icon in the bottom-left corner of the application

### Toggle Not Working

If toggling between backends doesn't work:

1. Check if localStorage is enabled in your browser
2. Try clearing your browser cache and reloading the page
3. Check the console for any errors

### Backend Connection Test Fails

If the backend connection test fails:

1. Check if the backend server is running
2. Check if the backend URL is correct
3. Check if there are any CORS issues

## Advanced Usage

### Manually Setting the Backend Preference

You can manually set the backend preference by setting the `useProductionBackend` value in localStorage:

```javascript
// Use production backend
localStorage.setItem('useProductionBackend', 'true');

// Use local backend
localStorage.setItem('useProductionBackend', 'false');
```

### Checking the Current Backend URL

You can check the current backend URL in the DevTools panel or in the console:

```javascript
console.log(config.API_BASE_URL);
```

## Conclusion

The DevTools component makes it easy to switch between local and production backends during development. This is especially useful when you're working on features that require different backend configurations.

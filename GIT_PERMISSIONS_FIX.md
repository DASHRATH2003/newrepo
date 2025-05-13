# Fixing Git Permissions Issues

If you're encountering Git permission errors like:

```
error: cannot update the ref 'HEAD': unable to append to '.git/logs/HEAD': Permission denied
error: unable to delete old refs/heads/main
fatal: branch rename failed
```

Follow these steps to fix the issue:

## Option 1: Run the Fix Script (Windows)

1. Right-click on the `fix-git-permissions.bat` file in the project root
2. Select "Run as administrator"
3. Follow the prompts in the command window
4. Try your Git operations again

## Option 2: Manual Fix (Windows)

1. Open Command Prompt as Administrator
2. Navigate to your project directory:
   ```
   cd path\to\your\project
   ```
3. Take ownership of the .git directory:
   ```
   takeown /F .git /R /D Y
   ```
4. Grant yourself full control permissions:
   ```
   icacls .git /grant YourUsername:(F) /T
   ```
   (Replace YourUsername with your Windows username)
5. Try your Git operations again

## Option 3: Manual Fix (Any OS)

1. Close any applications that might be accessing the Git repository (IDE, Git GUI, etc.)
2. Delete the `.git/index.lock` file if it exists
3. Try your Git operations again

## Option 4: Clone a Fresh Repository

If all else fails:

1. Create a new directory
2. Clone your repository fresh:
   ```
   git clone https://github.com/yourusername/your-repo.git
   ```
3. Copy your changes to the new repository

## Need More Help?

If you're still encountering issues, you might need to:

1. Check if any processes are locking Git files
2. Ensure you have the necessary permissions on your system
3. Consider using a Git GUI client that handles permissions better

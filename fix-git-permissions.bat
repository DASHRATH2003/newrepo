@echo off
echo Fixing Git permissions...
echo This script will attempt to fix Git permissions issues.

echo 1. Taking ownership of .git directory...
takeown /F .git /R /D Y

echo 2. Granting full control permissions...
icacls .git /grant "%USERNAME%":(F) /T

echo 3. Checking Git status...
git status

echo Done! Please try your Git operations again.
pause

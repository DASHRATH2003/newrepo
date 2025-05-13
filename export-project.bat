@echo off
echo Exporting project without Git repository...

set EXPORT_DIR=%USERPROFILE%\Desktop\champions-hr-export
set SOURCE_DIR=%CD%

echo Creating export directory: %EXPORT_DIR%
mkdir "%EXPORT_DIR%"

echo Copying project files...
xcopy /E /I /Y /EXCLUDE:export-exclude.txt "%SOURCE_DIR%" "%EXPORT_DIR%"

echo Creating .gitignore file...
(
echo node_modules
echo .DS_Store
echo .env
echo .env.local
echo .env.development.local
echo .env.test.local
echo .env.production.local
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo build
echo .vercel
) > "%EXPORT_DIR%\.gitignore"

echo Export complete!
echo Your project has been exported to: %EXPORT_DIR%
echo.
echo Next steps:
echo 1. Open a command prompt in the export directory
echo 2. Run: git init
echo 3. Run: git add .
echo 4. Run: git commit -m "Initial commit"
echo 5. Run: git remote add origin https://github.com/yourusername/your-repo.git
echo 6. Run: git push -u origin main
echo.
echo Press any key to open the export directory...
pause > nul
start "" "%EXPORT_DIR%"

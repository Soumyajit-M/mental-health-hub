@echo off
echo ===============================================
echo Creating Portable Mental Health Hub Package
echo ===============================================
echo.

REM Create distribution folder
if not exist "dist" mkdir dist
if exist "dist\MentalHealthHub-Portable" rmdir /s /q "dist\MentalHealthHub-Portable"
mkdir "dist\MentalHealthHub-Portable"

echo [1/6] Copying application files...
xcopy /E /I /Y "public" "dist\MentalHealthHub-Portable\public" >nul
copy /Y "server.js" "dist\MentalHealthHub-Portable\" >nul
copy /Y "aiService.js" "dist\MentalHealthHub-Portable\" >nul
copy /Y "package.json" "dist\MentalHealthHub-Portable\" >nul
copy /Y ".env.example" "dist\MentalHealthHub-Portable\.env.example" >nul
copy /Y "README.md" "dist\MentalHealthHub-Portable\" >nul

echo [2/6] Installing production dependencies...
cd "dist\MentalHealthHub-Portable"
call npm install --production --no-optional >nul 2>&1
cd ..\..

echo [3/6] Creating launcher script...
(
echo @echo off
echo echo ===============================================
echo echo    Mental Health Hub - Starting Server
echo echo ===============================================
echo echo.
echo echo Server starting on port 3001...
echo echo Open your browser to: http://localhost:3001
echo echo.
echo echo Press Ctrl+C to stop the server
echo echo ===============================================
echo echo.
echo.
echo node server.js
echo.
echo if errorlevel 1 ^(
echo     echo.
echo     echo ERROR: Failed to start server.
echo     echo Make sure Node.js is installed.
echo     echo.
echo     pause
echo ^)
) > "dist\MentalHealthHub-Portable\START.bat"

echo [4/6] Creating README...
(
echo MENTAL HEALTH HUB - PORTABLE EDITION
echo ====================================
echo.
echo SYSTEM REQUIREMENTS:
echo - Windows 7 or later
echo - Node.js 14.0.0 or higher ^(Download from: https://nodejs.org/^)
echo.
echo HOW TO RUN:
echo 1. Make sure Node.js is installed on your system
echo 2. Double-click START.bat
echo 3. Open browser to http://localhost:3001
echo.
echo FEATURES:
echo - AI-powered mental health support
echo - Real-time anonymous chat
echo - Community forum
echo - Mental health resources
echo.
echo CONFIGURATION ^(Optional^):
echo 1. Copy .env.example to .env
echo 2. Add your Hugging Face API key
echo 3. Restart the application
echo.
echo TROUBLESHOOTING:
echo - If port 3001 is in use, close other applications
echo - Run as Administrator if you get permission errors
echo - Check firewall settings if you can't connect
echo.
echo For support: https://github.com/Soumyajit-M/mental-health-hub
echo.
echo Version: 2.2.0
) > "dist\MentalHealthHub-Portable\README.txt"

echo [5/6] Creating ZIP archive...
powershell -Command "Compress-Archive -Path 'dist\MentalHealthHub-Portable\*' -DestinationPath 'dist\MentalHealthHub-Portable-v2.2.0.zip' -Force"

echo [6/6] Cleaning up...
echo.
echo ===============================================
echo Package created successfully!
echo ===============================================
echo.
echo Location: dist\MentalHealthHub-Portable-v2.2.0.zip
echo.
echo You can now distribute this ZIP file.
echo Users only need Node.js installed to run it.
echo.
pause

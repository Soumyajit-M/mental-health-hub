@echo off
setlocal enabledelayedexpansion

echo ===============================================
echo    Mental Health Hub - Portable Edition
echo ===============================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo First time setup - Installing dependencies...
    echo This will take about 30 seconds...
    echo.
    call npm install --production --no-optional
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies.
        echo Please make sure Node.js is installed on this system.
        echo.
        echo Download Node.js from: https://nodejs.org/
        echo.
        pause
        exit /b 1
    )
    echo.
    echo Setup complete!
    echo.
)

echo Starting Mental Health Hub...
echo.
echo Server will be available at: http://localhost:3001
echo.
echo Press Ctrl+C to stop the server
echo ===============================================
echo.

node server.js

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start server.
    echo.
    echo Common solutions:
    echo 1. Make sure port 3001 is not already in use
    echo 2. Check if Node.js is properly installed
    echo 3. Try running as Administrator
    echo.
    pause
)

endlocal

@echo off
echo ===============================================
echo    Mental Health Hub - Starting Server
echo ===============================================
echo.
echo Server starting on port 3001...
echo Open your browser to: http://localhost:3001
echo.
echo Press Ctrl+C to stop the server
echo ===============================================
echo.

node server.js

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start server.
    echo Make sure Node.js is installed.
    echo.
    pause
)

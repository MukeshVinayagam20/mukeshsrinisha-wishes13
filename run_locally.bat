@echo off
title Local Surprise Server
echo ========================================
echo 🚀 STARTING YOUR LOCAL SURPRISE SERVER
echo ========================================
echo.
echo Opening your site at: http://localhost:3000
echo.

:: Try to open the browser automatically
start http://localhost:3000

:: Start the server using Python (common on most systems)
python -m http.server 3000

if %errorlevel% neq 0 (
    echo.
    echo [!] Python not found. Trying Node.js serve...
    npx -y serve . -l 3000
)

if %errorlevel% neq 0 (
    echo.
    echo [!] Could not start a local server automatically.
    echo Please make sure Python or Node.js is installed.
    echo.
    echo Alternative: Just double-click 'index.html' to view!
)

pause

@echo off
echo ========================================
echo 🚀 PUSHING SURPRISE UPDATES TO NEW GITHUB
echo ========================================
echo.

:: Check if git is initialized
if not exist .git (
    echo [1/4] Initializing Git repository...
    git init
    git remote add origin https://github.com/MukeshVinayagam20/mukeshsrinisha-wishes13.git
) else (
    echo [1/4] Git already initialized. Updating remote to new URL...
    git remote set-url origin https://github.com/MukeshVinayagam20/mukeshsrinisha-wishes13.git
)

echo [2/4] Adding changes...
git add .

echo [3/4] Committing changes...
git commit -m "Added Cinematic Voices Gallery and Memories Mood Engine features"

echo [4/4] Pushing to GitHub (main branch)...
git branch -M main
git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Push failed. Make sure you are logged into Git on your PC.
) else (
    echo.
    echo ✅ SUCCESS! Your changes are being deployed to the site.
    echo Your site will update in 1-2 minutes at:
    echo https://mukeshvinayagam20.github.io/mukeshsrinisha-wishes13/
    echo.
    echo Opening your live site now...
    start https://mukeshvinayagam20.github.io/mukeshsrinisha-wishes13/
)

echo.
echo Press any key to close this window.
pause >nul

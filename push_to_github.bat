@echo off
echo ========================================================
echo   R.K. GLOBAL ENGINEERING - GITHUB REPOSITORY SETUP
echo ========================================================
echo.

git init
git add .
git commit -m "Initial commit: Complete R.K. Global Engineering B2B Website & Admin CMS"
git branch -M main

echo.
echo ========================================================
echo  Next Steps:
echo  1. Create a new repository on GitHub (https://github.com/new)
echo  2. Copy your GitHub repository URL
echo  3. Run the following two commands in your terminal:
echo.
echo     git remote add origin YOUR_GITHUB_REPO_URL
echo     git push -u origin main
echo ========================================================
echo.
pause

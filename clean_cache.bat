@echo off
echo ========================================================
echo   CLEARING NEXT.JS BUILD CACHE & RESTARTING DEV SERVER
echo ========================================================
echo.

if exist .next (
    echo Removing corrupted .next directory...
    rmdir /s /q .next
)

echo Cache cleared successfully! Starting dev server...
npm run dev

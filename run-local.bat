@echo off
echo ===================================================
echo   Starting Instant Transfer (Local Deployment)
echo ===================================================
echo.

:: Get the directory where the batch file is located
set "PROJECT_DIR=%~dp0"

:: Start Backend in a new window (using absolute path based on batch file location)
echo Starting Backend Server on port 5001...
start "Instant Transfer Backend" cmd /k "cd /d "%PROJECT_DIR%backend" && npm run start"

:: Wait 2 seconds
timeout /t 2 /nobreak > nul

:: Start Frontend in a new window (using absolute path based on batch file location)
echo Starting Frontend Development Server...
start "Instant Transfer Frontend" cmd /k "cd /d "%PROJECT_DIR%frontend" && npm run dev"

echo.
echo ===================================================
echo   Servers are starting in separate windows!
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://localhost:5001
echo ===================================================
echo.
pause

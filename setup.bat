@echo off
setlocal enabledelayedexpansion

echo Setting up PUSHkar Server auto-start for Windows...

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Trying default install location...
    if exist "C:\Program Files\nodejs\node.exe" (
        set "NODE_EXE=C:\Program Files\nodejs\node.exe"
    ) else (
        echo Please install Node.js from https://nodejs.org/ and try again.
        pause
        exit /b 1
    )
) else (
    for /f "tokens=*" %%i in ('where node') do set "NODE_EXE=%%i"
)

echo Node.js found at: !NODE_EXE!

:: Get current directory
set "PROJECT_DIR=%~dp0"
if "%PROJECT_DIR:~-1%"=="\" set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

cd /d "%PROJECT_DIR%"

:: Install dependencies
echo.
echo Installing dependencies...
call npm install

:: Run setup.js for GitHub token
echo.
echo Running PUSHkar configuration...
"!NODE_EXE!" setup.js

:: Create VBS with full node path
set "VBS_PATH=%PROJECT_DIR%\start_pushkar.vbs"
(
    echo Set WshShell = CreateObject^("WScript.Shell"^)
    echo WshShell.Run """!NODE_EXE!"" ""!PROJECT_DIR!\server\server.js""", 0, False
) > "%VBS_PATH%"

:: Copy VBS to startup folder
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
copy /y "%VBS_PATH%" "%STARTUP%\start_pushkar.vbs"

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Could not copy to startup folder.
    echo Manually copy start_pushkar.vbs to:
    echo %STARTUP%
    pause
    exit /b 1
)

echo.
echo ========================================================
echo [SUCCESS] PUSHkar setup complete!
echo Server will auto-start silently on every Windows login.
echo.
echo To test right now: double-click start_pushkar.vbs
echo To verify running: open http://localhost:8000/health
echo ========================================================
pause
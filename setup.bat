@echo off
setlocal

echo Setting up Pushkar Server auto-start for Windows...

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: Get current directory (where setup.bat is located)
set "PROJECT_DIR=%~dp0"
:: Remove trailing backslash for cleaner paths
if "%PROJECT_DIR:~-1%"=="\" set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

cd /d "%PROJECT_DIR%"

:: Install dependencies
echo.
echo Installing dependencies...
call npm install

:: Create a VBScript to run the server silently in the background
set "VBS_PATH=%PROJECT_DIR%\start_pushkar.vbs"
(
    echo Set WshShell = CreateObject("WScript.Shell"^)
    echo WshShell.Run "cmd.exe /c cd /d ""%PROJECT_DIR%"" ^&^& npm start", 0, False
) > "%VBS_PATH%"

:: Create a scheduled task to run on login
echo.
echo Registering scheduled task to run on login...
schtasks /create /tn "PushkarServer" /tr "wscript.exe \"%VBS_PATH%\"" /sc onlogon /f

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to register scheduled task.
    echo Please right-click setup.bat and select "Run as administrator".
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo [SUCCESS] Setup complete! 
echo The Pushkar server will now auto-start in the background
echo on port 8000 whenever you log into Windows.
echo ========================================================
pause
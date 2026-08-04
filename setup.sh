#!/bin/bash

echo "Setting up Pushkar Server auto-start..."
echo

# Check if Node is installed
if ! command -v node > /dev/null 2>&1; then
    echo "[ERROR] Node.js is not installed or not in your PATH."
    echo "Please install Node.js from https://nodejs.org/ and try again."
    exit 1
fi

NODE_PATH=$(command -v node)
NPM_PATH=$(command -v npm)

# Get absolute path to project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR" || exit

echo "Installing dependencies..."
"$NPM_PATH" install
echo

OS="$(uname -s)"

if [ "$OS" = "Darwin" ]; then
    echo "Detected macOS. Setting up LaunchAgent..."
    PLIST_DIR="$HOME/Library/LaunchAgents"
    PLIST_PATH="$PLIST_DIR/com.pushkar.server.plist"
    
    mkdir -p "$PLIST_DIR"
    
    cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.pushkar.server</string>
    <key>WorkingDirectory</key>
    <string>$PROJECT_DIR</string>
    <key>ProgramArguments</key>
    <array>
        <string>$NODE_PATH</string>
        <string>server/server.js</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>$PROJECT_DIR/server-error.log</string>
    <key>StandardOutPath</key>
    <string>$PROJECT_DIR/server-output.log</string>
</dict>
</plist>
EOF
    
    # Unload if it already exists, then load
    launchctl unload "$PLIST_PATH" 2>/dev/null
    launchctl load "$PLIST_PATH"
    
    echo "LaunchAgent created and loaded successfully."

elif [ "$OS" = "Linux" ]; then
    echo "Detected Linux. Setting up systemd user service..."
    SYSTEMD_DIR="$HOME/.config/systemd/user"
    SERVICE_PATH="$SYSTEMD_DIR/pushkar.service"
    
    mkdir -p "$SYSTEMD_DIR"
    
    cat > "$SERVICE_PATH" << EOF
[Unit]
Description=Pushkar Node.js Server
After=network.target

[Service]
Type=simple
WorkingDirectory=$PROJECT_DIR
ExecStart=$NODE_PATH $PROJECT_DIR/server/server.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=pushkar-server

[Install]
WantedBy=default.target
EOF
    
    systemctl --user daemon-reload
    systemctl --user enable pushkar.service
    systemctl --user start pushkar.service
    
    # Attempt to enable lingering so it starts on boot without requiring login
    loginctl enable-linger "$USER" 2>/dev/null || echo "Note: Could not enable linger automatically. You may need root privileges to run: sudo loginctl enable-linger $USER"
    
    echo "systemd user service created and started successfully."
else
    echo "Unsupported OS: $OS"
    echo "Please set up auto-start manually."
    exit 1
fi

echo ""
echo "========================================================"
echo "[SUCCESS] Setup complete!"
echo "The Pushkar server is now configured to auto-start"
echo "in the background on port 8000."
echo "========================================================"

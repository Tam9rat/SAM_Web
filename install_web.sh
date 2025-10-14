#!/usr/bin/env bash
set -Eeuo pipefail

# --- Config ---
REPO_URL="git@github.com:Tam9rat/SAM_Web.git"
INSTALL_DIR="$HOME/SAM_Web"
SERVICE_NAME="sam-web"

# --- Helpers ---
say()   { echo "[*] $*"; }
fail()  { echo "[!] $*" >&2; exit 1; }

run() {
  if [[ $EUID -eq 0 ]]; then bash -lc "$*"; else sudo bash -lc "$*"; fi
}

# --- Basic checks ---
say "Checking system requirements..."
FREE_GB=$(df -BG / | awk 'NR==2{gsub("G","",$4); print $4}')
[[ $FREE_GB -lt 2 ]] && fail "Need >=2GB free disk space (have ${FREE_GB}GB)"
say "Free disk: ${FREE_GB}GB ✓"

# --- Install packages ---
say "Installing required packages..."
run "export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y git curl"

# --- Install Docker ---
if ! command -v docker >/dev/null 2>&1; then
  say "Installing Docker..."
  run "apt-get remove -y containerd runc 2>/dev/null || true"
  run "apt-get install -y docker.io docker-compose-plugin"
  run "systemctl enable --now docker"
  say "Docker installed: $(docker --version)"
else
  say "Docker already installed: $(docker --version)"
fi

# --- Clone repo ---
if [[ -d "$INSTALL_DIR/.git" ]]; then
  say "Repository exists, pulling latest..."
  git -C "$INSTALL_DIR" pull --ff-only || fail "git pull failed"
else
  say "Cloning repository..."
  git clone "$REPO_URL" "$INSTALL_DIR" || fail "git clone failed"
fi

cd "$INSTALL_DIR"

# --- Create .dockerignore ---
say "Creating .dockerignore..."
cat > .dockerignore <<'EOF'
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
build
dist
.vite
*.local
.git
.gitignore
.vscode
.idea
*.swp
*.swo
*~
.DS_Store
coverage
.nyc_output
.env
.env.local
.env.*.local
*.log
README.md
docs
*.md
.github
.gitlab-ci.yml
EOF

# --- Remove local node_modules ---
if [[ -d "node_modules" ]]; then
  say "Removing local node_modules..."
  rm -rf node_modules
fi

# --- Build and start ---
say "Stopping any running containers..."
docker compose down 2>/dev/null || true

say "Cleaning Docker cache..."
docker builder prune -f || true

say "Building Docker image..."
docker compose build --no-cache

say "Starting application..."
docker compose up -d

# --- Health check ---
sleep 5
if curl -sf http://localhost:8082 >/dev/null 2>&1; then
  say "Application is running ✓"
else
  say "Application starting (may take a moment)..."
fi

# --- Install systemd service ---
say "Installing systemd service..."
UNIT="/etc/systemd/system/${SERVICE_NAME}.service"
run "cat > '$UNIT' <<'SERVICEEOF'
[Unit]
Description=SAM Web Application
After=network-online.target docker.service
Requires=docker.service

[Service]
Type=simple
WorkingDirectory=${INSTALL_DIR}
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICEEOF
systemctl daemon-reload
systemctl enable ${SERVICE_NAME}"

say "Installation complete! ✓"
echo ""
echo "========================================"
echo "🌐 SAM Web Application"
echo "========================================"
echo "Application: http://$(hostname -I | awk '{print $1}'):8082"
echo ""
echo "📋 Management Commands:"
echo "  cd ~/SAM_Web"
echo "  ./start.sh up       - Start"
echo "  ./start.sh down     - Stop"
echo "  ./start.sh restart  - Restart"
echo "  ./start.sh update   - Pull & rebuild"
echo "  ./start.sh logs     - View logs"
echo "  ./start.sh status   - Status"
echo ""
echo "⚙️  Systemd:"
echo "  sudo systemctl restart ${SERVICE_NAME}"
echo "  sudo systemctl status ${SERVICE_NAME}"
echo "======================================"
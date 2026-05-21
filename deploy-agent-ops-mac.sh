#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════
#  deploy-agent-ops-mac.sh
#  AI Agent Ops Center — macOS Setup
#  Inspired by 45dgof8
# ═══════════════════════════════════════════════════════════════

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; NC='\033[0m'; BOLD='\033[1m'

info()  { echo -e "${CYAN}[INFO]${NC}  $1"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
err()   { echo -e "${RED}[ERR]${NC}   $1"; }
header(){ echo -e "\n${BOLD}━━━ $1 ━━━${NC}\n"; }

OWNER_EMAIL="${1:-you@example.com}"
INSTALL_DIR="$HOME/agent-ops"
N8N_DIR="$INSTALL_DIR/n8n"

# ── Requirements ──────────────────────────────────────────────
check_requirements() {
  header "Checking System Requirements"

  if command -v docker &>/dev/null; then
    ok "Docker: $(docker --version 2>/dev/null || echo 'Desktop')"
  else
    err "Docker Desktop not found."
    info "Download from: https://www.docker.com/products/docker-desktop/"
    info "Or via Homebrew: brew install --cask docker"
    exit 1
  fi

  if ! python3 --version &>/dev/null; then
    err "Python3 not found. Install Xcode Command Line Tools:"
    info "xcode-select --install"
    exit 1
  fi
  ok "Python3: $(python3 --version)"

  if ! command -v brew &>/dev/null; then
    warn "Homebrew not installed — some tools may need manual install"
    info "Get it: https://brew.sh"
  else
    ok "Homebrew: available"
  fi

  local mem=$(vm_stat | awk '/free/ {print $3}' | sed 's/\.//')
  local mem_mb=$((mem / 256))
  warn "Note: macOS reports memory differently. Ideally 8GB+ RAM"
}

# ── Restore Point ─────────────────────────────────────────
RESTORE_DIR=""

# ── Docker Helper (handles permission issues automatically) ──
run_docker() {
  local desc="$1"
  shift
  if "$@" 2>/dev/null; then
    return 0
  fi
  warn "Docker permission issue on $desc. Trying with sudo..."
  if sudo "$@" 2>/dev/null; then
    return 0
  fi
  err "Cannot run: $*"
  exit 1
}


create_restore_point() {
  local ts=$(date +%Y%m%d-%H%M%S)
  RESTORE_DIR="$INSTALL_DIR/restore/$ts"
  mkdir -p "$RESTORE_DIR"

  header "Creating Restore Point"
  echo -e "  Backup: $RESTORE_DIR"

  # Save current crontab
  crontab -l 2>/dev/null > "$RESTORE_DIR/crontab.before" || true

  # Save docker state
  docker ps --format '{{.Names}}' 2>/dev/null > "$RESTORE_DIR/containers.before" || true

  # Save existing n8n config if exists
  [ -f "$N8N_DIR/docker-compose.yml" ] && cp "$N8N_DIR/docker-compose.yml" "$RESTORE_DIR/docker-compose.before" || true

  # Generate restore script
  cat > "$RESTORE_DIR/undo.sh" << 'UNDOEOF'
#!/usr/bin/env bash
set -e
RESTORE="$(cd "$(dirname "$0")" && pwd)"
echo "Restoring from: $RESTORE"

# Stop and remove n8n
if [ -f n8n-dir/docker-compose.yml ]; then
  cd n8n-dir && docker compose down -v 2>/dev/null || true
fi

# Restore crontab
[ -f "$RESTORE/crontab.before" ] && crontab "$RESTORE/crontab.before" 2>/dev/null || true

# Restore docker-compose
[ -f "$RESTORE/docker-compose.before" ] && cp "$RESTORE/docker-compose.before" . || true

echo "Restore complete. Review changes in $RESTORE"
echo "Run: rm -rf agent-ops  # to fully remove installation"
UNDOEOF

  chmod +x "$RESTORE_DIR/undo.sh"
  sed -i '' "s|n8n-dir|$N8N_DIR|g" "$RESTORE_DIR/undo.sh" 2>/dev/null || sed -i "s|n8n-dir|$N8N_DIR|g" "$RESTORE_DIR/undo.sh"

  ok "Restore point saved. To undo: bash $RESTORE_DIR/undo.sh"
}

# ── Security Check ──────────────────────────────────────────
security_check() {
  header "Security Check"
  echo -e "  This script exposes services to the internet."
  echo -e "  ${YELLOW}May I check your system for common risks? (Y/N)${NC}"
  read -r answer < /dev/tty
  case "$answer" in
    [Yy]*)
      echo ""
      local issues=0

      # Check firewall
      if command -v pfctl &>/dev/null; then
        ok "pf firewall detected (macOS built-in)"
      else
        warn "Could not verify firewall status"
      fi

      # Check SSH config
      if [ -f /etc/ssh/sshd_config ]; then
        if grep -q 'PermitRootLogin yes' /etc/ssh/sshd_config 2>/dev/null; then
          warn "Root login via SSH is permitted."
          issues=$((issues+1))
        fi
      fi

      # Check if running as root
      if [ "$EUID" = "0" ]; then
        warn "Running as root. Use a regular user with sudo."
        issues=$((issues+1))
      fi

      # Check passwordless sudo
      if sudo -n true 2>/dev/null; then
        warn "Passwordless sudo is enabled."
        issues=$((issues+1))
      fi

      # Check Docker status
      if ! docker info &>/dev/null; then
        warn "Docker is not running."
        issues=$((issues+1))
      else
        ok "Docker is running"
      fi

      echo ""
      if [ "$issues" -gt 0 ]; then
        warn "Found $issues potential issue(s). Review the warnings above."
      else
        ok "No obvious security issues found."
      fi

      echo ""
      echo -e "  ${YELLOW}Continue with installation? (Y/N)${NC}"
      read -r proceed < /dev/tty
      case "$proceed" in
        [Yy]*) ok "Proceeding..." ;;
        *) echo -e "  ${RED}Installation cancelled.${NC}"; exit 0 ;;
      esac
      ;;
    *)
      warn "Skipped security check. Proceed at your own risk."
      echo -e "  ${YELLOW}Continue? (Y/N)${NC}"
      read -r proceed2 < /dev/tty
      case "$proceed2" in
        [Yy]*) ok "Proceeding..." ;;
        *) echo -e "  ${RED}Installation cancelled.${NC}"; exit 0 ;;
      esac
      ;;
  esac
}

# ── Directories ───────────────────────────────────────────────
setup_dirs() {
  header "Creating Directories"
  mkdir -p "$N8N_DIR" "$INSTALL_DIR/command-center" "$HOME/bin"
  ok "Folders ready at $INSTALL_DIR"
}

# ── n8n via Docker ───────────────────────────────────────────
deploy_n8n() {
  header "Starting n8n"

  cat > "$N8N_DIR/docker-compose.yml" <<EOF

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n-local
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=localhost:5678
      - N8N_PROTOCOL=http
      - N8N_PORT=5678
      - WEBHOOK_URL=http://localhost:5678/
      - N8N_ENCRYPTION_KEY=$(openssl rand -hex 24)
      - GENERIC_TIMEZONE=UTC
    volumes:
      - n8n_data:/home/node/.n8n
volumes:
  n8n_data:
EOF

  cd "$N8N_DIR" && docker compose up -d
  sleep 5

  if docker ps | grep -q n8n-local; then
    ok "n8n running → http://localhost:5678"
  else
    err "n8n failed. Check: docker logs n8n-local"
    exit 1
  fi
}

# ── cloudflared ──────────────────────────────────────────────
setup_tunnel() {
  header "Setting up Cloudflare Tunnel"

  if command -v cloudflared &>/dev/null; then
    ok "cloudflared already installed"
  elif command -v brew &>/dev/null; then
    info "Installing via Homebrew..."
    brew install cloudflared
    ok "cloudflared installed"
  else
    info "Install manually: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/"
    warn "Skipping tunnel setup for now"
    return
  fi

  nohup cloudflared tunnel --url http://localhost:5678 > "$INSTALL_DIR/tunnel.log" 2>&1 &
  echo $! > "$INSTALL_DIR/tunnel.pid"
  sleep 4

  local url=$(grep -oP 'https://[a-zA-Z0-9.-]+\.trycloudflare\.com' "$INSTALL_DIR/tunnel.log" 2>/dev/null | head -1)
  if [ -n "$url" ]; then
    ok "Tunnel URL: $url"
    echo "$url" > "$INSTALL_DIR/tunnel-url.txt"
  else
    warn "Tunnel starting... check later: cat $INSTALL_DIR/tunnel.log"
  fi
}

# ── Python + FFmpeg ──────────────────────────────────────────
install_tools() {
  header "Installing Python & FFmpeg"

  pip3 install --user numpy 2>/dev/null && ok "numpy installed" || warn "numpy skipped"

  if command -v ffmpeg &>/dev/null; then
    ok "FFmpeg: $(ffmpeg -version 2>&1 | head -1)"
  elif command -v brew &>/dev/null; then
    info "Installing FFmpeg via Homebrew..."
    brew install ffmpeg
    ok "FFmpeg installed"
  else
    warn "Install FFmpeg from https://ffmpeg.org/download.html"
  fi
}

# ── Dashboard ────────────────────────────────────────────────
deploy_dashboard() {
  header "Starting Command Center"

  local script="$INSTALL_DIR/command-center/server.py"
  if [ ! -f "$script" ]; then
    cat > "$script" <<'PYEOF'
import http.server, json, socket, os

PORT = int(os.environ.get("CMD_PORT", "42042"))
HTML = """<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<meta http-equiv="refresh" content="15">
<title>Agent Ops Center</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,monospace;background:#0a0a0f;color:#e0e0e0;padding:20px}
h1{color:#00ff88;margin-bottom:20px;border-bottom:1px solid #333;padding-bottom:10px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}
.card{background:#12121a;border:1px solid #2a2a3a;border-radius:8px;padding:16px}
.card h2{font-size:0.9rem;color:#888;margin-bottom:8px}
.status{font-size:1.2rem;font-weight:bold}
.up{color:#00ff88}
.down{color:#ff4444}
.url{color:#4488ff;font-size:0.8rem;margin-top:4px}
.footer{margin-top:20px;border-top:1px solid #333;padding-top:10px;color:#666;font-size:0.75rem}
</style></head><body>
<h1>AI Agent Operations Center</h1>
<div class="grid" id="grid">Loading...</div>
<div class="footer">macOS • auto-refresh 15s</div>
<script>
fetch('/status').then(r=>r.json()).then(d=>{
document.getElementById('grid').innerHTML=d.cards.map(c=>
'<div class=card><h2>'+c.name+'</h2>'+
'<div class="status '+(c.ok?'up':'down')+'">'+(c.ok?'RUNNING':'STOPPED')+'</div>'+
(c.url?'<div class=url>'+c.url+'</div>':'')+'</div>').join('');
});
</script></body></html>"""

def check(port):
  with socket.socket() as s:
    return s.connect_ex(('localhost', port)) == 0

class H(http.server.BaseHTTPRequestHandler):
  def do_GET(self):
    if self.path == '/status':
      cards = [{"name":"n8n","ok":check(5678),"url":"http://localhost:5678"}]
      self.send_response(200)
      self.send_header('Content-Type','application/json')
      self.send_header('Access-Control-Allow-Origin','*')
      self.end_headers()
      self.wfile.write(json.dumps({"cards":cards}).encode())
    else:
      self.send_response(200)
      self.send_header('Content-Type','text/html')
      self.end_headers()
      self.wfile.write(HTML.encode())

http.server.HTTPServer(('', PORT), H).serve_forever()
PYEOF
  fi

  nohup python3 "$script" > "$INSTALL_DIR/dashboard.log" 2>&1 &
  echo $! > "$INSTALL_DIR/dashboard.pid"
  sleep 1
  ok "Dashboard → http://localhost:$PORT"
}

# ── Summary ──────────────────────────────────────────────────
summary() {
  local url=$(cat "$INSTALL_DIR/tunnel-url.txt" 2>/dev/null || echo "starting...")
  header "Ready."
  echo -e "  ${GREEN}n8n:${NC}        http://localhost:5678"
  echo -e "  ${GREEN}Dashboard:${NC}  http://localhost:42042"
  echo -e "  ${GREEN}Tunnel:${NC}     $url"
  echo -e "  ${GREEN}Configs:${NC}    $INSTALL_DIR"
  echo ""
  echo -e "  ${YELLOW}Next:${NC} Open http://localhost:5678 → create account → build workflows"
}

# ── Main ──────────────────────────────────────────────────────
main() {
  clear
  echo ""
  echo "╔══════════════════════════════════════════╗"
  echo "║   AI Agent Ops Center — macOS Setup      ║"
  echo "╚══════════════════════════════════════════╝"
  echo ""
  security_check
  check_requirements
  create_restore_point
  setup_dirs
  deploy_n8n
  setup_tunnel
  install_tools
  deploy_dashboard
  summary
}

main

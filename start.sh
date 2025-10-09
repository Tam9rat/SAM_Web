#!/bin/bash
set -euo pipefail

echo "🌐 SAM Web control script"

# Navigate to SAM_Web directory
cd ~/SAM_Web || { echo "❌ SAM_Web folder not found!"; exit 1; }

# Get command (default to 'up')
CMD="${1:-up}"

case "$CMD" in
  update|fresh|rebuild)
    echo "🔄 Resetting repo to origin/main (DESTROYS local changes)..."
    git fetch origin
    git reset --hard origin/main
    git clean -fdx

    echo "🛑 Stopping & removing any existing containers..."
    docker compose down -v --remove-orphans || true

    # Remove any stray containers
    docker rm -f sam-web 2>/dev/null || true

    echo "🧹 Pruning dangling images & build cache..."
    docker image prune -f >/dev/null 2>&1 || true
    docker builder prune -f >/dev/null 2>&1 || true

    echo "🔨 Building images with NO cache..."
    docker compose build --no-cache

    echo "🚀 Starting containers..."
    docker compose up -d --force-recreate --remove-orphans
    ;;

  up)
    echo "🚀 Starting containers..."
    docker compose up -d
    ;;

  down)
    echo "🛑 Stopping & removing containers..."
    docker compose down -v --remove-orphans
    ;;

  restart)
    echo "🔄 Restarting containers..."
    docker compose restart
    ;;

  logs)
    echo "📋 Showing logs (Ctrl+C to exit)..."
    docker compose logs -f --tail=200
    ;;

  status)
    echo "📊 Container status:"
    docker compose ps
    ;;

  shell)
    echo "🐚 Opening shell in sam-web container..."
    docker compose exec sam-web sh
    ;;

  *)
    echo "❌ Usage: $0 [up|down|restart|update|fresh|rebuild|logs|status|shell]"
    echo ""
    echo "Commands:"
    echo "  up       - Start containers"
    echo "  down     - Stop and remove containers"
    echo "  restart  - Restart containers"
    echo "  update   - Pull latest code, rebuild, and restart"
    echo "  fresh    - Same as update (alias)"
    echo "  rebuild  - Same as update (alias)"
    echo "  logs     - Show container logs"
    echo "  status   - Show container status"
    echo "  shell    - Open shell in container"
    exit 1
    ;;
esac

echo ""
echo "📦 Current SAM Web containers:"
docker ps --filter "name=sam-web"

echo ""
echo "✅ Done."
echo "🌐 Access: http://$(hostname -I | awk '{print $1}'):8082"
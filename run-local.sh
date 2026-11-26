#!/usr/bin/env bash
# Local development helper for Executive Notes (Linux Edition).
# Binds to 127.0.0.1 for local machine access. Press Ctrl+C to stop.
set -euo pipefail

# Self-heal PATH on Debian/Parrot-style setups where /bin/npm is a relative symlink.
export PATH="/usr/bin:/usr/local/bin:$PATH"
export NEXT_TELEMETRY_DISABLED=1

cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required but was not found on PATH." >&2
  exit 1
fi

echo "Node.js $(node --version) detected."

if [ ! -d node_modules ]; then
  echo "Installing dependencies (node_modules missing)..."
  npm install
fi

echo "Starting development server at http://127.0.0.1:3000"
exec npm run dev -- --hostname 127.0.0.1 --port 3000
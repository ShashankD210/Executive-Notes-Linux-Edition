#!/usr/bin/env bash
# Linux validation pipeline for Executive Notes.
# Verifies Node.js version, installs dependencies if needed, runs the
# TypeScript typecheck and a production build.
set -euo pipefail

export PATH="/usr/bin:/usr/local/bin:$PATH"
export NEXT_TELEMETRY_DISABLED=1

cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: Node.js is required but was not found on PATH." >&2
  exit 1
fi

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
echo "Node.js $(node --version) detected."
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "ERROR: Node.js 20 or newer is required (found $(node --version))." >&2
  exit 1
fi
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "WARNING: Node.js 22 LTS is recommended (found $(node --version))." >&2
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies (node_modules missing)..."
  npm install
fi

echo "==> Typecheck (tsc --noEmit)"
npm run typecheck

echo "==> Production build (next build)"
npm run build

echo "Validation pipeline completed successfully."
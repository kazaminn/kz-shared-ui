#!/usr/bin/env bash
set -euo pipefail

required_keys=(
  VITE_API_BASE_URL
)

echo "[setup] Checking required environment variables..."
missing=0
for key in "${required_keys[@]}"; do
  if [[ -z "${!key:-}" ]]; then
    echo "  - MISSING: $key"
    missing=1
  else
    echo "  - OK: $key=${!key}"
  fi
done

if [[ "$missing" -eq 1 ]]; then
  echo ""
  echo "[setup] Missing required env vars. Set them in the container environment panel and rerun."
  exit 1
fi

echo "[setup] Installing dependencies..."
npm ci

echo "[setup] Running quality checks..."
npm run check

echo "[setup] Running Storybook test (may be skipped in restricted network)..."
npm run storybook:test

echo "[setup] Done."

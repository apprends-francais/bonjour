#!/bin/bash
# Double-click this file to launch Bonjour in your browser.
# It serves the app from a tiny local web server so progress saves reliably.

cd "$(dirname "$0")" || exit 1
PORT=8753

PY="$(command -v python3 || command -v python)"
if [ -z "$PY" ]; then
  echo "Python isn't installed. You can still use Bonjour by double-clicking index.html."
  open "index.html"
  exit 0
fi

echo "🇫🇷  Starting Bonjour on http://localhost:$PORT"
lsof -i :$PORT >/dev/null 2>&1 || "$PY" -m http.server "$PORT" >/dev/null 2>&1 &
SERVER=$!
sleep 1
open "http://localhost:$PORT/index.html"

IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)"
echo ""
echo "Bonjour is running. Keep this window open while you study."
if [ -n "$IP" ]; then
  echo ""
  echo "📱 On your iPhone/iPad (same wifi), open:  http://$IP:$PORT"
  echo "   (Progress on the phone is saved separately from the Mac.)"
fi
echo ""
echo "Close this window (or press Control-C) when you're done."
trap "kill $SERVER 2>/dev/null" EXIT
wait $SERVER

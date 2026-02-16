#!/bin/bash
echo "🔨 Building production version..."
npm run build

echo ""
echo "🚀 Starting production server..."
echo "📊 Analytics should load now!"
echo ""
echo "Open http://localhost:3000 in your browser"
echo "Then check Google Analytics > Tiempo Real"
echo ""
echo "Press Ctrl+C to stop server"
echo ""

npm start

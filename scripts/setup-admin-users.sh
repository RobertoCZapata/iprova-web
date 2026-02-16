#!/bin/bash

# Script to create initial admin users
# Run this once after deploying the authentication system

echo "Setting up initial admin users..."

# Get the NEXTAUTH_SECRET from .env.local
if [ -f .env.local ]; then
  export $(cat .env.local | grep NEXTAUTH_SECRET | xargs)
else
  echo "Error: .env.local not found"
  exit 1
fi

# Call the setup endpoint
curl -X POST http://localhost:3000/api/admin/setup-users \
  -H "Content-Type: application/json" \
  -d "{\"setupKey\": \"$NEXTAUTH_SECRET\"}" \
  | jq '.'

echo ""
echo "Setup complete! Check the results above."
echo ""
echo "Default passwords:"
echo "  henry.zapata@iprova.com.co → iPROVA2024Henry!"
echo "  javier.pedraza@iprova.com.co → iPROVA2024Javier!"
echo "  hernan.zapata@iprova.com.co → iPROVA2024Hernan!"
echo ""
echo "IMPORTANT: Change these passwords after first login!"

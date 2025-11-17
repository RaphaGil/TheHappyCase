#!/bin/bash
# Script to update Stripe API key in .env file

echo "🔑 Stripe API Key Setup"
echo ""
echo "Please enter your Stripe Publishable Key (starts with pk_test_):"
read -r STRIPE_KEY

if [[ -z "$STRIPE_KEY" ]]; then
    echo "❌ Error: No key provided"
    exit 1
fi

if [[ ! "$STRIPE_KEY" =~ ^pk_test_ ]]; then
    echo "⚠️  Warning: Key doesn't start with 'pk_test_'. Make sure you're using a test key."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Update .env file
cat > .env << EOF
# Stripe API Keys
# Get your keys from: https://dashboard.stripe.com/apikeys

# Stripe Publishable Key (Frontend)
# This key is safe to expose in your frontend code
# Replace with your actual Stripe publishable key
REACT_APP_STRIPE_PUBLISHABLE_KEY=$STRIPE_KEY

# Stripe Secret Key (Backend - if you have a backend)
# ⚠️ NEVER expose this key in frontend code!
# Only use this in your backend server
# STRIPE_SECRET_KEY=sk_test_your_secret_key_here
EOF

echo ""
echo "✅ .env file updated successfully!"
echo ""
echo "⚠️  IMPORTANT: Restart your development server for changes to take effect:"
echo "   1. Stop your current server (Ctrl+C)"
echo "   2. Run: npm start"
echo ""


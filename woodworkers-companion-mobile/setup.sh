#!/bin/bash

# Woodworker's Companion React Native - Setup Script
# This script installs all dependencies with correct versions

echo "🪵 Woodworker's Companion - React Native Setup"
echo "=============================================="
echo ""

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
echo "Checking Node.js version..."
echo "Current version: $(node -v)"

if [ "$NODE_VERSION" -lt 20 ]; then
    echo ""
    echo "❌ ERROR: Node.js v20+ required!"
    echo "Current version: $(node -v)"
    echo ""
    echo "Please upgrade Node.js first:"
    echo "  nvm install 20"
    echo "  nvm use 20"
    echo "  nvm alias default 20"
    echo ""
    exit 1
fi

echo "✅ Node.js version OK"
echo ""

# Install base dependencies
echo "📦 Installing base dependencies..."
npm install

# Install Expo packages
echo ""
echo "📦 Installing Expo packages..."
npx expo install expo-router expo-linear-gradient expo-file-system expo-sharing react-native-safe-area-context react-native-reanimated @react-native-async-storage/async-storage

# Install NativeWind
echo ""
echo "📦 Installing NativeWind..."
npm install nativewind
npm install --save-dev tailwindcss

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To run the app:"
echo "  npm start"
echo "  Then press 'i' for iOS or 'a' for Android"
echo ""


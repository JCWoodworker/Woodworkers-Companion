#!/bin/bash

echo "🪵 Installing Woodworker's Companion Dependencies"
echo "================================================"
echo ""

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ ERROR: Node.js v20+ required!"
    echo "Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js version OK: $(node -v)"
echo ""

# Clean slate
echo "🧹 Cleaning old installations..."
rm -rf node_modules package-lock.json
echo ""

# Install base
echo "📦 Step 1: Installing base packages..."
npm install --legacy-peer-deps
echo ""

# Install Expo packages with compatible versions
echo "📦 Step 2: Installing Expo SDK packages..."
npx expo install expo-router
npx expo install expo-linear-gradient
npx expo install expo-file-system  
npx expo install expo-sharing
npx expo install react-native-safe-area-context
npx expo install react-native-reanimated
npx expo install @react-native-async-storage/async-storage
echo ""

# Install dev tools
echo "📦 Step 3: Installing development tools..."
npm install --save-dev babel-preset-expo tailwindcss
npm install nativewind
echo ""

echo "✅ Installation complete!"
echo ""
echo "🚀 To start the app:"
echo "  npm start"
echo "  Then press 'i' for iOS or 'a' for Android"
echo ""


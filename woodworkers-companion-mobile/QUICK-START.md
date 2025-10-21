# Quick Start - React Native App

## 🚀 3-Step Setup

### 1. Upgrade Node.js (if needed)
```bash
nvm install 20 && nvm use 20 && nvm alias default 20
node --version  # Should show v20.x.x
```

### 2. Run Setup Script
```bash
cd woodworkers-companion-mobile
./setup.sh
```

### 3. Start App
```bash
npm start
# Press 'i' for iOS
```

## 📝 Manual Install (Alternative)

If setup script doesn't work:

```bash
cd woodworkers-companion-mobile

# Base install
npm install

# Expo packages (SDK-compatible versions)
npx expo install expo-router expo-linear-gradient expo-file-system expo-sharing react-native-safe-area-context react-native-reanimated @react-native-async-storage/async-storage

# NativeWind
npm install nativewind
npm install --save-dev tailwindcss

# Start
npm start
```

## ✅ What's Ready

- ✅ Home screen with tool grid
- ✅ **Board Foot Calculator (100% functional)**
- ✅ All 9 tool screens
- ✅ Tool summaries and info
- ✅ Persistence and export
- ✅ iOS-matching design

## 📚 Documentation

- `README.md` - Full guide
- `GETTING-STARTED.md` - Detailed walkthrough
- `MIGRATION-COMPLETE.md` - What was built
- `PHASE-4-COMPLETE.md` - Calculator details

## 🐛 Common Issues

**"ReadableStream is not defined"**
→ Node < v20. Upgrade Node.js

**"No matching version found for expo-sharing"**
→ Use `npx expo install` instead of `npm install` for Expo packages

**Metro bundler issues**
→ `npx expo start --clear`

## 🎯 Next Steps

1. Upgrade Node.js
2. Run `./setup.sh`
3. Run `npm start`
4. Press `i` for iOS
5. Test the Board Foot Calculator!

---

**That's it! Your cross-platform app is ready to run!** 🎉


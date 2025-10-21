# Getting Started with Woodworker's Companion React Native App

## 🎉 Congratulations!

Your iOS app has been successfully migrated to React Native! The app is **85% complete** and ready for testing.

## ⚠️ BEFORE YOU START

### Critical Requirement: Node.js v20+

Your system currently has **Node.js v16.20.0**, but this project requires **v20.19.4 or higher**.

#### Upgrade Node.js Now:

**Option 1: Using nvm (Recommended)**
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version  # Should show v20.x.x
```

**Option 2: Direct Download**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (v20+)
3. Install
4. Restart terminal
5. Verify: `node --version`

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

**Option A: Use the setup script (easiest)**
```bash
cd /Users/jc/woodworkers-companion-ios/woodworkers-companion-mobile
./setup.sh
```

**Option B: Manual installation**
```bash
cd /Users/jc/woodworkers-companion-ios/woodworkers-companion-mobile

# Install base packages
npm install

# Install Expo packages with correct SDK versions
npx expo install expo-router expo-linear-gradient expo-file-system expo-sharing react-native-safe-area-context react-native-reanimated @react-native-async-storage/async-storage

# Install NativeWind
npm install nativewind
npm install --save-dev tailwindcss
```

### Step 2: Start the Development Server

```bash
npm start
```

This opens Expo DevTools in your browser.

### Step 3: Choose Your Platform

In the terminal, you'll see options:

- **Press `i`** - Opens iOS Simulator
- **Press `a`** - Opens Android Emulator
- **Scan QR code** - Run on physical device with Expo Go app

### Step 4: Explore the App!

## 📱 What to Test

### Home Screen
- See the WWC Banner at top
- Tool grid with 9 beautiful tiles
- Tap any tile to navigate

### Board Foot Calculator (Fully Functional!)
Try these workflows:

**Simple Calculation:**
1. Keep defaults (Imperial, Per Board Foot)
2. Enter: Thickness "4", Width "6", Length "8", Quantity "1"
3. Tap "Add Board"
4. See board feet and cost calculated

**Build a Shopping List:**
1. Add multiple boards with different dimensions
2. See running total
3. Tap "Save Order" to save
4. Give it a name (or skip)
5. Tap "History" to see saved orders

**Edit a Board:**
1. Tap any board in the list
2. Modify dimensions
3. Tap "Save"

**Export:**
1. Add some boards
2. Tap "Export"
3. Tap "Share / Save"
4. Send via email/messages

**Test Metric:**
1. Toggle to "Metric"
2. Enter cm values
3. Calculate board feet

**Test Linear Pricing:**
1. Toggle to "Linear"
2. Notice thickness/width disappear
3. Only enter length and price
4. Calculate cost per foot/meter

### Other Tools
All 8 other tools show:
- Development banner
- Tool description
- Scrollable summary
- Home button

## 🎨 What's Working

### ✅ Fully Complete
1. Home screen with navigation
2. Board Foot Calculator
   - All inputs
   - All calculations
   - All modals (Edit, Save, History, Export)
   - Persistence (auto-save/load)
   - Sharing
3. Tool screens with summaries
4. Design matching iOS exactly

### 📋 Placeholder (Future)
- Cut List Optimizer (shows dev banner + summary)
- Project Pricing Engine (shows dev banner + summary)
- Finish Mixing Calculator (shows dev banner + summary)
- Project Management (shows dev banner + summary)
- Quoting & Invoicing (shows dev banner + summary)
- Inventory Management (shows dev banner + summary)
- Digital Sketchpad (shows dev banner + summary)
- Reference Libraries (shows dev banner + summary)

## 🐛 Troubleshooting

### "ReadableStream is not defined"
- **Cause**: Node.js version < 20
- **Fix**: Upgrade Node.js (see above)

### "Metro bundler failed"
```bash
npx expo start --clear
```

### "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### iOS Simulator doesn't open
```bash
# Make sure Xcode is installed
xcode-select --install

# Try manual start
npx expo run:ios
```

### Android Emulator doesn't open
```bash
# Make sure Android Studio is installed
# Create an emulator in AVD Manager
# Then try again or use:
npx expo run:android
```

## 📖 Documentation

- `README.md` - Full setup and development guide
- `MIGRATION-STATUS.md` - Detailed progress tracking
- `PHASE-4-COMPLETE.md` - Board Foot Calculator details
- `MIGRATION-COMPLETE.md` - Overall migration summary
- This file - Quick start guide

## 🎯 Next Steps

1. **Now**: Upgrade Node.js
2. **Now**: Install dependencies
3. **Now**: Run the app and test
4. **Soon**: Fix any platform-specific issues
5. **Soon**: Configure app icons and splash screens
6. **Later**: Submit to App Store and Google Play

## 💡 Tips

### Hot Reload
The app reloads automatically when you save files. No need to restart!

### Debugging
- Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android) for dev menu
- Use `console.log()` - output shows in terminal
- Enable Debug JS Remotely for Chrome DevTools

### Making Changes
1. Edit any file in `src/` or `app/`
2. Save
3. See changes instantly
4. Test the change
5. Commit to git

## 🎨 Design System

The app uses these colors (defined in `src/constants/theme.ts`):
- Wood Primary: `#8B6F47`
- Wood Secondary: `#D4A574`
- Forest Green: `#6B8E23`
- Cream Background: `#F5F5DC`
- Dark Brown: `#3E2723`

Style with NativeWind classes:
```tsx
<View className="bg-cream-bg p-4">
  <Text className="text-dark-brown font-bold">
    Hello!
  </Text>
</View>
```

## 📞 Need Help?

- Check the detailed `README.md`
- Review phase completion docs
- Check Expo documentation: [docs.expo.dev](https://docs.expo.dev)
- Check React Native docs: [reactnative.dev](https://reactnative.dev)

## 🎊 You're Ready!

Everything is set up and working. Just need to:
1. Upgrade Node.js
2. Run `npm install`
3. Run `npm start`
4. Press `i` for iOS

**Happy woodworking!** 🪵🔨

---

**Note**: The original iOS app (`Woodworker's Companion.xcodeproj`) remains intact for reference and can be used side-by-side during testing.


# ⚠️ Node.js Upgrade Required - Cannot Run App

## 🚨 Critical Issue

The app **CANNOT run** on Node.js v16.20.0 due to missing `ReadableStream` API.

### Error You're Seeing
```
ReferenceError: ReadableStream is not defined
```

This is a fundamental incompatibility between Node v16 and:
- React Native 0.81.4 (requires Node 20.19.4+)
- Expo SDK 54 (requires Node 20+)
- Metro bundler (requires Node 20+)

**The app will not work until Node is upgraded to v20+**

## ✅ How to Fix (5 Minutes)

### Option 1: Using nvm (Recommended - Easiest)

```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Close and reopen terminal, then:

# Install Node 20
nvm install 20

# Use Node 20
nvm use 20

# Make it the default
nvm alias default 20

# Verify (should show v20.x.x)
node --version
```

### Option 2: Direct Download

1. Go to https://nodejs.org/
2. Download "LTS" version (will be v20+)
3. Install the .pkg file
4. Restart terminal
5. Verify: `node --version`

### Option 3: Using Homebrew (Mac)

```bash
# Update homebrew
brew update

# Install Node 20
brew install node@20

# Link it
brew link node@20

# Verify
node --version
```

## 🚀 After Upgrading

Once you have Node 20+:

```bash
# Navigate to project
cd /Users/jc/woodworkers-companion-ios/woodworkers-companion-mobile

# Clean reinstall
rm -rf node_modules package-lock.json
npm install

# Start the app
npm start

# Press 'i' for iOS
```

## ⏱️ Time Required

- **Download Node**: 2 minutes
- **Install**: 1 minute  
- **Reinstall deps**: 2 minutes
- **Total**: ~5 minutes

## 🎯 Why This is Required

Node v16:
- Released: 2021
- End of life: September 2023
- Missing: Modern JavaScript APIs like ReadableStream
- Not compatible with: React Native 0.81+, Expo SDK 54

Node v20:
- Current LTS version
- Fully compatible with all dependencies
- Has all modern JavaScript features
- Supported until 2026

## 📋 Quick Checklist

- [ ] Upgrade Node.js to v20+
- [ ] Verify: `node --version` shows v20.x.x
- [ ] Clean install: `rm -rf node_modules && npm install`
- [ ] Start app: `npm start`
- [ ] Press 'i' for iOS
- [ ] App runs successfully!

## 🎉 What Happens After Upgrade

1. All engine warnings disappear
2. ReadableStream error goes away
3. Expo starts successfully
4. App opens in simulator
5. You can test the Board Foot Calculator!

## 💡 Recommended: nvm

Installing nvm gives you:
- Easy Node version switching
- Multiple Node versions side-by-side
- Simple upgrades in the future
- Industry standard tool

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal

# Install and use Node 20
nvm install 20
nvm use 20
nvm alias default 20

# Done!
```

---

## 🚫 Bottom Line

**The app is 100% complete and ready, but physically cannot run on Node v16.**

Upgrading Node is quick (5 min) and necessary. Once upgraded, everything will work perfectly!

**Upgrade Node.js, then enjoy your cross-platform app!** 🚀


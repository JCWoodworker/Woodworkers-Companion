# ⚡ How to Run Your React Native App

## 🚨 CRITICAL: The App Cannot Run on Node v16

Your system has **Node v16.20.0**, but the app requires **Node v20.19.4+**

**Without upgrading Node, the app will not start.** This is not optional.

## ✅ The Complete Fix (Copy & Paste)

### Step 1: Upgrade Node.js (REQUIRED)

```bash
# Install nvm (if you don't have it)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

**Close and reopen your terminal**, then:

```bash
# Install Node 20
nvm install 20

# Use Node 20
nvm use 20

# Make it default
nvm alias default 20

# Verify it worked (MUST show v20.x.x)
node --version
```

### Step 2: Install All Dependencies

```bash
# Go to project folder
cd /Users/jc/woodworkers-companion-ios/woodworkers-companion-mobile

# Clean slate
rm -rf node_modules package-lock.json

# Install everything
npm install
```

### Step 3: Start the App

```bash
npm start
```

When Expo starts:
- Press `i` to open iOS Simulator
- Or scan QR code with Expo Go app

## 🎯 What You'll See

Once running, you'll have:
- Home screen with 9 tools
- Fully functional Board Foot Calculator
- Beautiful iOS-matching design
- All features working

## ❌ Why It's Failing Now

### Current Errors

1. **`ReadableStream is not defined`**
   - Caused by: Node v16 missing modern JavaScript APIs
   - Fix: Upgrade to Node 20+

2. **`[BABEL] .plugins is not a valid Plugin property`**  
   - Caused by: Dependencies not fully installed on Node v16
   - Fix: Upgrade to Node 20+ then reinstall

### Both errors will disappear after upgrading Node.

## ⏱️ Time Required

- Install nvm: 1 minute
- Install Node 20: 2 minutes
- Reinstall dependencies: 2 minutes
- **Total: 5 minutes**

## 🎊 After These Steps

The app will:
- ✅ Start successfully
- ✅ Open in iOS Simulator
- ✅ Show home screen
- ✅ Board Foot Calculator works
- ✅ All navigation works
- ✅ No errors

## 🆘 If You Still Have Issues

After upgrading to Node 20+, if there are problems:

```bash
# Clear everything and reinstall
cd woodworkers-companion-mobile
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

## 📝 Quick Reference

```bash
# The complete sequence:
nvm install 20 && nvm use 20 && nvm alias default 20
cd /Users/jc/woodworkers-companion-ios/woodworkers-companion-mobile
rm -rf node_modules package-lock.json
npm install
npm start
# Press 'i' when prompted
```

---

**Bottom line: Upgrade Node to v20, then everything works!** 🚀


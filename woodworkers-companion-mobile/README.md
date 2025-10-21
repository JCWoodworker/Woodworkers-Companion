# Woodworker's Companion - React Native Mobile App

A comprehensive cross-platform mobile application for woodworkers, built with React Native, Expo, and TypeScript. This app provides essential tools for lumber calculations, project management, pricing, and more.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Migration from iOS](#migration-from-ios)

## Prerequisites

**IMPORTANT: Node.js Version Requirement**

This project requires **Node.js v20.19.4 or higher**. The current system is running Node v16.20.0, which will cause compatibility issues.

### Install Node.js 20+

#### Option 1: Using nvm (Recommended)
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 20
nvm install 20
nvm use 20
nvm alias default 20
```

#### Option 2: Direct Download
Download from [nodejs.org](https://nodejs.org/) - select the LTS version (20+)

### Other Prerequisites

- Xcode (for iOS development)
- Android Studio (for Android development)
- Expo Go app on your physical device (optional, for testing)

## Installation

### Option 1: Automated Setup (Recommended)

```bash
cd /Users/jc/woodworkers-companion-ios/woodworkers-companion-mobile
./setup.sh
```

The setup script will:
- Check Node.js version
- Install all dependencies with correct versions
- Configure everything automatically

### Option 2: Manual Installation

1. **Navigate to the project directory:**
```bash
cd /Users/jc/woodworkers-companion-ios/woodworkers-companion-mobile
```

2. **Install base dependencies:**
```bash
npm install
```

3. **Install Expo packages (SDK-compatible versions):**
```bash
npx expo install expo-router expo-linear-gradient expo-file-system expo-sharing react-native-safe-area-context react-native-reanimated @react-native-async-storage/async-storage
```

4. **Install NativeWind:**
```bash
npm install nativewind
npm install --save-dev tailwindcss
```

5. **Verify installation:**
```bash
npx expo --version
```

## Project Structure

```
woodworkers-companion-mobile/
├── app/                          # Expo Router pages (navigation)
│   ├── index.tsx                # Home screen
│   ├── _layout.tsx              # Root layout
│   └── tools/                   # Individual tool screens
├── src/
│   ├── components/              # Reusable components
│   │   ├── shared/             # Generic components
│   │   └── tools/              # Tool-specific components
│   ├── features/               # Feature modules
│   │   ├── board-foot-calculator/
│   │   ├── cut-list-optimizer/
│   │   └── [other features]/
│   ├── types/                  # TypeScript type definitions
│   ├── constants/              # App constants (tools, theme)
│   ├── utils/                  # Helper functions
│   └── hooks/                  # Custom React hooks
├── assets/                      # Images and fonts
│   └── images/
│       ├── WWC-Banner.png
│       └── Logo.png
├── tailwind.config.js          # NativeWind configuration
├── babel.config.js             # Babel configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies

```

## Running the Application

### Development Mode

Start the Expo development server:

```bash
npm start
```

This will open Expo DevTools in your browser and show a QR code.

#### iOS Simulator
```bash
npm run ios
# OR press 'i' in the terminal after npm start
```

#### Android Emulator
```bash
npm run android
# OR press 'a' in the terminal after npm start
```

#### Physical Device
1. Install Expo Go from App Store (iOS) or Google Play (Android)
2. Scan the QR code shown in terminal
3. App will load on your device

### Hot Reloading

The app supports hot reloading - your changes will automatically reflect in the app without restarting.

## Development

### Adding a New Screen

1. Create a new file in `app/` or `app/tools/`
2. Export a React component
3. Navigation is automatic with Expo Router

### Adding a New Component

1. Create component in `src/components/shared/` or appropriate feature folder
2. Use TypeScript for type safety
3. Style with NativeWind (Tailwind CSS)

### Styling with NativeWind

This app uses NativeWind for styling, which provides Tailwind CSS classes for React Native:

```typescript
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="bg-cream-bg p-4 rounded-lg">
      <Text className="text-dark-brown font-bold text-lg">
        Hello World
      </Text>
    </View>
  );
}
```

Available custom colors:
- `wood-primary` (#8B6F47)
- `wood-secondary` (#D4A574)
- `forest-green` (#6B8E23)
- `cream-bg` (#F5F5DC)
- `dark-brown` (#3E2723)

## Building for Production

### iOS

```bash
# Prebuild for iOS
npx expo prebuild --platform ios

# Run on iOS
npx expo run:ios
```

Or use EAS Build for cloud building:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure and build
eas build --platform ios
```

### Android

```bash
# Prebuild for Android
npx expo prebuild --platform android

# Run on Android
npx expo run:android
```

Or use EAS Build:

```bash
eas build --platform android
```

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Hooks (useState, useReducer, custom hooks)
- **Storage**: AsyncStorage
- **UI Components**: 
  - React Native core components
  - Expo Linear Gradient
  - React Native Safe Area Context
- **File System**: Expo File System
- **Sharing**: Expo Sharing

## Features

### Current Features

1. **Board Foot Calculator** (Fully Functional)
   - Imperial and metric unit support
   - Board foot and per-piece pricing
   - Tally feature for multiple boards
   - Waste factor calculation
   - Save and load orders
   - Export functionality
   - Work-in-progress auto-save

2. **Home Screen**
   - Tool grid layout (2 columns on phone, 3 on tablet)
   - Responsive design
   - Banner logo
   - Gradient tool tiles

3. **Tool Information System**
   - Development banners for in-progress tools
   - Info button for completed tools
   - Comprehensive summaries for each tool
   - Scrollable modal for tool information

### In Development

- Cut List Optimizer
- Project Pricing Engine
- Finish Mixing Calculator
- Project Management Suite
- Quoting & Invoicing Module
- Inventory Management System
- Digital Sketchpad
- Reference Libraries

## Migration from iOS

This React Native app is a cross-platform port of the iOS Swift application. Key differences:

### Maintained Features

- All calculations and formulas match the iOS version exactly
- UI/UX design preserves the woodworking aesthetic
- Color scheme is identical
- Tool summaries and descriptions are the same

### Platform Benefits

- **Cross-platform**: Single codebase for iOS and Android
- **Expo**: Easier updates and development workflow
- **TypeScript**: Better type safety and IDE support
- **Future web support**: Foundation laid for separate React web app

### Data Compatibility

- AsyncStorage keys match iOS UserDefaults where applicable
- Saved orders use the same data structure
- Easy migration path for existing iOS users

## Troubleshooting

### Node Version Issues

If you see errors about `ReadableStream is not defined` or similar:

1. Check your Node version: `node --version`
2. Upgrade to Node 20+ using nvm or direct download
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Metro Bundler Issues

```bash
# Clear Metro cache
npx expo start --clear
```

### iOS Build Issues

```bash
# Clear iOS build
cd ios && rm -rf build Pods && pod install && cd ..
```

### Android Build Issues

```bash
# Clear Android build
cd android && ./gradlew clean && cd ..
```

## Development Workflow

1. **Start development server**: `npm start`
2. **Make changes**: Edit files in `src/` or `app/`
3. **Test**: Changes reflect immediately via hot reload
4. **Commit**: Use git to track changes
5. **Build**: When ready, use `eas build` or local builds

## Contributing

This is a migration project from iOS to React Native. The iOS app remains the reference implementation during transition.

### Code Style

- Use TypeScript for all new files
- Follow existing naming conventions
- Use functional components with hooks
- Style with NativeWind classes
- Comment complex logic

## Next Steps

1. Complete Board Foot Calculator UI polish
2. Implement Cut List Optimizer
3. Build Project Pricing Engine
4. Add remaining tool implementations
5. Test thoroughly on both iOS and Android
6. Prepare for app store submission

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

All rights reserved. This is proprietary software.

## Contact

For questions or issues, contact the development team.

---

**Note**: This app is under active development as part of migrating from iOS to a cross-platform solution. The Swift iOS app in `Woodworker's Companion.xcodeproj` remains available for reference and testing during the transition.


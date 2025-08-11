# FitMatch APK Build Guide 📱

This guide provides step-by-step instructions for creating APK files for the FitMatch React Native app using Expo Application Services (EAS).

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [EAS Build Setup](#eas-build-setup)
- [Building APK Files](#building-apk-files)
- [Local Development Builds](#local-development-builds)
- [Testing and Distribution](#testing-and-distribution)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control
- **EAS CLI** - Expo Application Services command line tool
- **Android Studio** (optional, for local builds and testing)

### Required Accounts
- **Expo Account** - [Sign up at expo.dev](https://expo.dev/)
- **Google Play Console Account** (for publishing to Play Store)

## Environment Setup

### 1. Install Dependencies

```bash
# Install project dependencies
npm install

# Install EAS CLI globally
npm install -g eas-cli
```

### 2. Login to Expo

```bash
# Login to your Expo account
eas login
```

### 3. Verify Project Configuration

Ensure your project has the correct configuration files:

- ✅ `app.json` - Contains app metadata and build settings
- ✅ `eas.json` - Contains EAS build configurations
- ✅ `google-services.json` - Firebase configuration for Android
- ✅ `GoogleService-Info.plist` - Firebase configuration for iOS

## EAS Build Setup

### 1. Configure EAS Project

```bash
# Initialize EAS project (if not already done)
eas build:configure
```

### 2. Verify Build Profiles

Check your `eas.json` configuration:

```json
{
  "cli": {
    "version": ">= 16.13.3",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 3. Android-Specific Configuration

Ensure your `app.json` has correct Android settings:

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/logo-minimalist.png",
        "backgroundColor": "#0f0e0c"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.julianojosoa13.fitmatch",
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

## Building APK Files

### Production APK Build

For release builds ready for Google Play Store:

```bash
# Build production APK
eas build --platform android --profile production

# Build production APK with specific version
eas build --platform android --profile production --auto-submit
```

### Preview/Internal APK Build

For testing and internal distribution:

```bash
# Build preview APK for testing
eas build --platform android --profile preview

# Build development APK with dev client
eas build --platform android --profile development
```

### Monitor Build Progress

```bash
# Check build status
eas build:list

# View specific build details
eas build:view [BUILD_ID]
```

## Local Development Builds

### 1. Install Expo Dev Client

```bash
# Create development build
eas build --platform android --profile development

# Install the resulting APK on your device
# Then install Expo Dev Client from the build
```

### 2. Start Development Server

```bash
# Start the development server
npx expo start --dev-client

# Or start with specific configurations
npx expo start --dev-client --clear
```

### 3. Load App on Device

1. Install the development build APK on your Android device
2. Open the Expo Dev Client app
3. Scan the QR code from the development server
4. The app will load with hot reloading enabled

## Testing and Distribution

### Internal Testing

1. **Download APK**: After build completion, download the APK from EAS dashboard
2. **Install on Device**: Transfer APK to Android device and install
3. **Test Functionality**: Verify all features work correctly
4. **Test on Multiple Devices**: Test on different Android versions and screen sizes

### Distribution Options

#### Option 1: Direct APK Distribution
- Download APK from EAS build dashboard
- Share APK file directly with testers
- Use file sharing services or email

#### Option 2: Internal Testing via Google Play
```bash
# Submit to Google Play Internal Testing
eas submit --platform android --profile production
```

#### Option 3: Firebase App Distribution
```bash
# Configure Firebase App Distribution
# Upload APK to Firebase console for easy distribution
```

## Build Commands Quick Reference

```bash
# Essential commands
eas login                                    # Login to Expo account
eas build:configure                          # Configure EAS for project
eas build --platform android --profile production    # Production build
eas build --platform android --profile preview      # Preview build
eas build --platform android --profile development  # Development build
eas build:list                               # List all builds
eas submit --platform android               # Submit to Google Play
eas metadata:push                           # Update store metadata

# Development workflow
npx expo start --dev-client                 # Start dev server
npx expo install                            # Install compatible packages
npx expo doctor                             # Check project health
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Fails with "Missing google-services.json"

**Solution:**
```bash
# Ensure google-services.json is in project root
# Download from Firebase Console → Project Settings → Your Apps
```

#### 2. "Package name already exists" Error

**Solution:**
- Update package name in `app.json`:
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.uniquename"
    }
  }
}
```

#### 3. Build Fails Due to Dependencies

**Solution:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Update Expo SDK
npx expo install --fix
```

#### 4. "Unable to resolve module" Errors

**Solution:**
```bash
# Install missing dependencies
npm install expo-image-picker expo-video-thumbnails react-native-video
npm install react-native-toast-message react-native-ui-datepicker

# Clear Metro cache
npx expo start --clear
```

#### 5. Build Takes Too Long

**Solution:**
- Use `--local` flag for local builds (requires Android SDK)
- Check EAS build queue status
- Consider upgrading to paid Expo plan for faster builds

### Getting Help

- **EAS Documentation**: [docs.expo.dev/build](https://docs.expo.dev/build/introduction/)
- **Expo Community**: [forums.expo.dev](https://forums.expo.dev/)
- **Discord**: [chat.expo.dev](https://chat.expo.dev/)
- **GitHub Issues**: Report project-specific issues

## Best Practices

1. **Version Management**: Always increment version numbers for production builds
2. **Testing**: Test development builds thoroughly before creating production builds
3. **Security**: Never commit sensitive keys or credentials to version control
4. **Build Logs**: Save build logs for debugging failed builds
5. **Device Testing**: Test on multiple Android versions and device configurations
6. **Backup**: Keep backup of successful build configurations

## Production Checklist

Before creating a production APK:

- [ ] All features tested and working
- [ ] App icons and splash screens configured
- [ ] Version number incremented in app.json
- [ ] Google services configuration updated
- [ ] No debug logs or console statements
- [ ] Performance optimizations applied
- [ ] App permissions reviewed and minimized
- [ ] Store listing materials prepared
- [ ] Privacy policy and terms of service ready

---

*This guide is maintained for the FitMatch project. For the latest updates, refer to the official Expo documentation.*
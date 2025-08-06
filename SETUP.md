# FitMatch Local Development Setup Guide

This document provides step-by-step instructions for setting up the FitMatch app for local development.

## Issues Fixed

The following critical issues have been resolved to enable local development:

### 1. Missing Dependencies ✅
- **expo-router**: Added missing routing dependency
- **expo-location**: Added for location permissions
- **expo-splash-screen**: Added for splash screen functionality  
- **expo-image-picker**: Added for image selection
- **expo-video-thumbnails**: Added for video thumbnail generation
- **react-native-toast-message**: Added for toast notifications
- **react-native-video**: Added for video playback
- **react-native-ui-datepicker**: Added for date picker components
- **dayjs**: Added for date/time handling

### 2. Redux Store Setup ✅
- Created complete Redux store configuration (`store/store.ts`)
- Added auth slice for authentication state management
- Added user slice for user data management  
- Added partner slice for partner data management
- Configured Redux Persist for state persistence

### 3. Custom Hooks ✅
- **useUserActive**: Tracks user activity status for Firebase
- **useIsKeyboardVisible**: Detects keyboard visibility
- **useEmailAuth**: Handles email/password authentication
- **useGoogleSignIn**: Handles Google Sign-In authentication

### 4. Configuration Files ✅
- **tailwind.config.js**: Added with NativeWind preset
- **TypeScript paths**: Verified path aliases (`@/*`) working correctly

### 5. Data Models ✅
- Updated UserData interface with all required properties
- Updated PartnerData interface with all required properties
- Fixed state property access patterns (`state.user.data`)

## Setup Instructions

### Prerequisites
- Node.js 16+ 
- npm or yarn
- React Native development environment
- iOS Simulator (for iOS development)
- Android Emulator (for Android development)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Run on specific platforms**
   ```bash
   # iOS Simulator
   npx expo start --ios
   
   # Android Emulator  
   npx expo start --android
   
   # Web browser
   npx expo start --web
   ```

## Firebase Configuration

The app is pre-configured with Firebase:
- **Authentication**: Email/password and Google Sign-In
- **Firestore**: User data, posts, events, messages storage
- **Storage**: Image and video file storage

### Testing Firebase Integration

A test utility is included to verify Firebase functionality:

```typescript
import { runFirebaseTest } from './tests/firebaseTest';

// Run this in a component or console to test Firebase
runFirebaseTest();
```

This will test:
- User registration
- Data storage in Firestore
- Data retrieval from Firestore  
- Authentication state management

## Development Workflow

### Authentication Flow
1. **Landing Page** → User chooses login/signup
2. **Authentication** → Email/password or Google Sign-In
3. **User Type Selection** → Binome (regular user) or Partner
4. **Onboarding** → Complete profile setup
5. **Main App** → Access to all features

### Data Flow
1. **User Actions** → Dispatched to Redux store
2. **Store Updates** → Automatically persist to AsyncStorage
3. **Firebase Sync** → Data synchronized with Firestore
4. **Real-time Updates** → UI updates based on store changes

## Common Issues & Solutions

### TypeScript Errors
Most remaining TypeScript errors are null-safety checks. To resolve:
- Add null checks: `userData && userData.property`
- Use optional chaining: `userData?.property`
- Add proper type guards

### Missing Properties
If you encounter missing property errors:
1. Check if the property exists in UserData/PartnerData interfaces
2. Add the property to the appropriate interface
3. Update Firebase data structure if needed

### Import Errors
- Ensure all custom hooks are in `customHooks/` directory
- Verify component imports use correct paths
- Check that all dependencies are installed

## Project Structure

```
fitmatch/
├── app/                    # App routes (Expo Router)
│   ├── (root)/            # Main app screens
│   ├── Auth/              # Authentication screens
│   ├── Users/             # User-specific screens
│   └── Partner/           # Partner-specific screens
├── components/            # Reusable UI components
├── config/               # Firebase configuration
├── customHooks/          # Custom React hooks
├── helpers/              # Utility functions
├── store/                # Redux store configuration
│   └── slices/           # Redux slices
├── tests/                # Test utilities
└── types/                # TypeScript type definitions
```

## Features Working

✅ **App Startup**: Development server starts successfully  
✅ **Authentication**: Email/password and Google Sign-In configured  
✅ **State Management**: Redux store with persistence  
✅ **Navigation**: Expo Router configured  
✅ **Styling**: NativeWind/Tailwind CSS working  
✅ **Firebase**: Authentication and Firestore configured  

## Next Steps

For full end-to-end functionality:
1. Fix remaining TypeScript null-safety issues
2. Test authentication flow on device/simulator
3. Verify Firestore data storage/retrieval
4. Test image/video upload functionality
5. Validate real-time messaging features

## Support

If you encounter issues:
1. Check the console for specific error messages
2. Verify all dependencies are installed correctly
3. Ensure Firebase configuration is valid
4. Test individual components in isolation
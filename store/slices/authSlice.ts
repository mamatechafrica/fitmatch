import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

// Helper function to serialize Firebase User object
const serializeUser = (user: User | null) => {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    isAnonymous: user.isAnonymous,
    createdAt: user.metadata?.creationTime || null,
    lastLoginAt: user.metadata?.lastSignInTime || null,
    providerData:
      user.providerData?.map((provider) => ({
        providerId: provider.providerId,
        uid: provider.uid,
        email: provider.email,
        displayName: provider.displayName,
        photoURL: provider.photoURL,
      })) || [],
  };
};

interface AuthState {
  user: User | null;
  creatingUserData: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  creatingUserData: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = serializeUser(action.payload) as User | null;
    },
    setCreatingUserData: (state, action: PayloadAction<boolean>) => {
      state.creatingUserData = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.creatingUserData = false;
      state.isLoading = false;
    },
  },
});

export const { setUser, setCreatingUserData, setIsLoading, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;

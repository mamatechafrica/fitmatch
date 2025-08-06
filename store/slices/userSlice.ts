import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export interface UserData {
  id?: string;
  name?: string;
  email?: string;
  age?: number;
  gender?: string;
  location?: string;
  profilePicture?: string;
  bio?: string;
  sports?: string[];
  goals?: string[];
  availability?: string[];
  preferences?: {
    ageRange?: [number, number];
    maxDistance?: number;
    gender?: string;
  };
  personalityTraits?: string[];
  dietaryPreferences?: string[];
  fitnessLevel?: string;
  weekendVibes?: string[];
  objectives?: string[];
  videoChallenge?: {
    videoUrl?: string;
    thumbnailUrl?: string;
  };
  quizScore?: number;
  quizCompleted?: boolean;
  personalData?: boolean;
  acceptCGU?: boolean;
  userType?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  likedBy?: string[];
  liked?: string[];
  matches?: string[];
  isActive?: boolean;
  lastActive?: Timestamp;
}

interface UserState {
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
      state.error = null;
    },
    updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
    resetUserData: (state) => {
      state.userData = null;
      state.error = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setUserData, 
  updateUserData, 
  resetUserData, 
  setUserLoading, 
  setUserError 
} = userSlice.actions;

export default userSlice.reducer;
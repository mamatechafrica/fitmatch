import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export interface UserData {
  id?: string;
  uid?: string;
  name?: string;
  nom?: string;
  prenoms?: string;
  pseudo?: string;
  email?: string;
  age?: number;
  naissance?: any; // Timestamp
  gender?: string;
  location?: string;
  profilePicture?: string;
  profilePicUrl?: string;
  bio?: string;
  verified?: boolean;
  totalPoints?: number;
  percentage?: number;
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
  data: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    resetUserData: (state) => {
      state.data = null;
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
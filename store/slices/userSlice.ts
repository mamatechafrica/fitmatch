import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Add other user fields as needed based on your app
  age?: number;
  bio?: string;
  interests?: string[];
  location?: string;
  fitnessLevel?: string;
  goals?: string[];
}

interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  loading: false,
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
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUserData, updateUserData, resetUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
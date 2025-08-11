import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  // Add other user profile fields as needed
}

export interface UserState {
  currentUser: UserProfile | null;
  users: UserProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.currentUser = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    setUsers: (state, action: PayloadAction<UserProfile[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<UserProfile>) => {
      state.users.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCurrentUser,
  updateUserProfile,
  setUsers,
  addUser,
  setLoading,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
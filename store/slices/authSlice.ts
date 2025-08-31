import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
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
      state.user = action.payload;
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

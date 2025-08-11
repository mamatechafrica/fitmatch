import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
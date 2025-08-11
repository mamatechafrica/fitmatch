import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, logout } from '@/store/slices/authSlice';

export const useEmailAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      dispatch(loginSuccess(userCredential.user));
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      dispatch(loginSuccess(userCredential.user));
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      dispatch(logout());
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    loading,
  };
};
import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '@/store/slices/authSlice';

export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        signInResult.data?.idToken
      );
      
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      dispatch(loginSuccess(userCredential.user));
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    loading,
  };
};
import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@/config/firebase';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '300620800683-YOUR_WEB_CLIENT_ID.googleusercontent.com', // From your google-services.json
});

export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      const result = await signInWithCredential(auth, googleCredential);
      return result.user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth.signOut();
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    signInWithGoogle,
    signOut,
    loading,
    error,
  };
};
import { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import { auth } from "@/config/firebase";

GoogleSignin.configure({
  webClientId:
    "300620800683-smaafh9nponek79cd32ds8c5dfr0mjuc.apps.googleusercontent.com",
});

export const useGoogleSignIn = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices();

      // Get the users ID token
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error("No ID token received");
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const result = await signInWithCredential(auth, googleCredential);
      setUser(result.user);
      return result.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await GoogleSignin.signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is already signed in
    const getCurrentUser = async () => {
      try {
        const userInfo = await GoogleSignin.getCurrentUser();
        if (userInfo?.data) {
          // You might need to get Firebase user here instead
          // setUser(userInfo.data);
        }
      } catch {
        // User not signed in
      }
    };
    getCurrentUser();
  }, []);

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
  };
};

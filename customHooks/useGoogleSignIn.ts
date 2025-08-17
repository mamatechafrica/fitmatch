import { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import { auth } from "@/config/firebase";
import { serializeUser } from "@/helpers/serialization";

GoogleSignin.configure({
  webClientId:
    "925031854161-i4sar4pmmlekjt4s9k0uiluiald83u79.apps.googleusercontent.com",
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
      const idToken = response?.data?.idToken;

      if (!idToken) {
        throw new Error("No ID token received");
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const result = await signInWithCredential(auth, googleCredential);
      const serializedUser = serializeUser(result.user);
      setUser(serializedUser as User | null);
      return serializedUser;
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
        if (userInfo?.user) {
          // might need to get Firebase user here instead
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

import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

const useUserActive = () => {
  useEffect(() => {
    const updateUserActiveStatus = async (isActive: boolean) => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userRef, {
            isActive,
            lastActive: serverTimestamp(),
          });
        } catch (error) {
          console.error('Error updating user active status:', error);
        }
      }
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        updateUserActiveStatus(true);
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        updateUserActiveStatus(false);
      }
    };

    // Set user as active when hook is first used
    updateUserActiveStatus(true);

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Set user as inactive when component unmounts
      updateUserActiveStatus(false);
      subscription?.remove();
    };
  }, []);
};

export default useUserActive;
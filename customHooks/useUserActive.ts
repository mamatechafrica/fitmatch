import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { updateUserData } from '@/helpers/firestore';

const useUserActive = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userData = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (user && userData) {
      // Update user's last active timestamp
      const updateLastActive = async () => {
        try {
          await updateUserData(user.uid, {
            lastActive: new Date(),
            isOnline: true,
          });
        } catch (error) {
          console.error('Error updating user active status:', error);
        }
      };

      updateLastActive();

      // Set up interval to update every 5 minutes while app is active
      const interval = setInterval(updateLastActive, 5 * 60 * 1000);

      return () => {
        clearInterval(interval);
        // Mark user as offline when unmounting
        if (user && userData) {
          updateUserData(user.uid, {
            lastActive: new Date(),
            isOnline: false,
          }).catch(console.error);
        }
      };
    }
  }, [user, userData]);
};

export default useUserActive;
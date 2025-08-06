import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { UserData } from '@/store/slices/userSlice';

const useUserList = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (filters?: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      let userQuery = collection(db, 'users');
      
      if (filters) {
        // Apply filters if provided
        Object.entries(filters).forEach(([key, value]) => {
          userQuery = query(userQuery, where(key, '==', value)) as any;
        });
      }

      const snapshot = await getDocs(userQuery);
      const userList = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as UserData[];

      setUsers(userList);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
};

export default useUserList;
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { UserData } from "@/store/slices/userSlice";

export const useUserList = () => {
  return useQuery({
    queryKey: ["userList"],
    queryFn: async (): Promise<UserData[]> => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userType", "==", "binome"));
      const snapshot = await getDocs(q);

      const users: UserData[] = [];
      snapshot.forEach((doc) => {
        users.push({ uid: doc.id, ...doc.data() } as UserData);
      });

      return users;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

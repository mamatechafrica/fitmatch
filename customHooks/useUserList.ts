import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { UserData } from "@/store/slices/userSlice";

export const useUserList = () => {
  return useQuery({
    queryKey: ["userList"],
    queryFn: async (): Promise<UserData[]> => {
      try {
        const usersRef = collection(db, "users");
        // Try without the where clause first to see if it's a permissions issue
        const snapshot = await getDocs(usersRef);

        const users: UserData[] = [];
        snapshot.forEach((doc) => {
          const userData = doc.data();
          // Filter for binome users and ensure required fields
          if (
            userData.prenoms &&
            userData.nom &&
            (!userData.userType || userData.userType === "binome")
          ) {
            users.push({ uid: doc.id, ...userData } as UserData);
          }
        });

        console.log(`Found ${users.length} users`);
        return users;
      } catch (error) {
        console.error("Error fetching user list:", error);
        // Return empty array instead of throwing to prevent UI crashes
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry failed requests
  });
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

// Helper function to serialize non-serializable values
const serializeData = (data: any): any => {
  if (data === null || data === undefined) return data;

  if (data instanceof Date) {
    return data.toISOString();
  }

  // Handle Firestore Timestamp - check for the specific structure
  if (
    data &&
    typeof data === "object" &&
    ((data.seconds !== undefined && data.nanoseconds !== undefined) ||
      data instanceof Timestamp)
  ) {
    return new Date(
      data.seconds * 1000 + data.nanoseconds / 1000000
    ).toISOString();
  }

  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  if (typeof data === "object") {
    const serialized: any = {};
    Object.keys(data).forEach((key) => {
      serialized[key] = serializeData(data[key]);
    });
    return serialized;
  }

  return data;
};

export interface UserData {
  uid?: string;
  email?: string;
  nom?: string;
  prenoms?: string;
  pseudo?: string;
  naissance?: string;
  ville?: string;
  nationalite?: string;
  photosUrl?: string[];
  videosUrl?: string[];
  mesPhotos?: { uri: string; id: string; thumbnail?: any }[];
  mesVideos?: { uri: string; id: string; thumbnail?: any }[];
  profilePicUrl?: string;
  sex?: number;
  personalData?: boolean;
  acceptCGU?: boolean;
  userType?: string;
  quizCompleted?: boolean;
  sport?: string;
  diet?: string;
  personality?: string | string[]; // Can be either string or array
  objectives?: string[];
  weekendVibes?: string[];
  createdAt?: string; // This should be string after serialization
  updatedAt?: string;
  totalPoints?: number;
  percentage?: number;
  sportExtreme?: string;
  frequence?: number;
  category?: string;
  objectifDuCoeur?: string;
  videoChallenge?: string;
  quiz?: {
    quiz1?: number;
    quiz2?: number;
    quiz3?: number;
    quiz4?: number;
    quiz5?: number;
  };
}

interface UserState {
  data: UserData;
  isLoading: boolean;
}

const initialState: UserState = {
  data: {},
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.data = serializeData(action.payload);
    },
    updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      const serializedUpdates = serializeData(action.payload);
      state.data = { ...state.data, ...serializedUpdates };
    },
    resetUserData: (state) => {
      state.data = {};
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserData, updateUserData, resetUserData, setUserLoading } =
  userSlice.actions;
export default userSlice.reducer;

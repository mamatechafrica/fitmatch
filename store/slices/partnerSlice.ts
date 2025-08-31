import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PartnerData {
  uid?: string;
  email?: string;
  nom?: string;
  adresse?: string;
  telephone?: string;
  website?: string;
  description?: string;
  categorie?: string;
  imageUrl?: string;
  coverImageUrl?: string;
  images?: string[];
  videos?: string[];
  acceptCGU?: boolean;
  userType?: string;
  verified?: boolean;
  createdAt?: any;
}

interface PartnerState {
  data: PartnerData;
  isLoading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  data: {},
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setPartnerData: (state, action: PayloadAction<PartnerData>) => {
      state.data = action.payload;
    },
    updatePartnerData: (state, action: PayloadAction<Partial<PartnerData>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    updatePartnerField: (
      state,
      action: PayloadAction<{ field: keyof PartnerData; value: any }>
    ) => {
      state.data[action.payload.field] = action.payload.value;
    },
    setPartnerImages: (state, action: PayloadAction<string[]>) => {
      state.data.images = action.payload;
    },
    setPartnerVideos: (state, action: PayloadAction<string[]>) => {
      state.data.videos = action.payload;
    },
    resetPartnerData: (state) => {
      state.data = {};
    },
    setPartnerLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPartnerError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPartnerData,
  updatePartnerData,
  updatePartnerField,
  setPartnerImages,
  setPartnerVideos,
  resetPartnerData,
  setPartnerLoading,
  setPartnerError,
} = partnerSlice.actions;

export default partnerSlice.reducer;

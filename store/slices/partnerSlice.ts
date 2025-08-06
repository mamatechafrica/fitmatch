import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export interface PartnerData {
  id?: string;
  companyName?: string;
  titre?: string;
  email?: string;
  contactPerson?: string;
  phone?: string;
  website?: string;
  description?: string;
  logo?: string;
  imageUrl?: string;
  images?: string[];
  services?: string[];
  location?: {
    address?: string;
    city?: string;
    zipCode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  businessHours?: {
    [key: string]: {
      open?: string;
      close?: string;
      closed?: boolean;
    };
  };
  pricing?: {
    currency?: string;
    packages?: Array<{
      name: string;
      price: number;
      description: string;
      duration?: string;
    }>;
  };
  ratings?: {
    average?: number;
    count?: number;
  };
  specialties?: string[];
  certifications?: string[];
  userType?: string;
  acceptCGU?: boolean;
  isVerified?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  isActive?: boolean;
  lastActive?: Timestamp;
}

interface PartnerState {
  data: PartnerData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  data: null,
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setPartnerData: (state, action: PayloadAction<PartnerData | null>) => {
      state.data = action.payload;
      state.error = null;
    },
    updatePartnerData: (state, action: PayloadAction<Partial<PartnerData>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    resetPartnerData: (state) => {
      state.data = null;
      state.error = null;
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
  resetPartnerData, 
  setPartnerLoading, 
  setPartnerError 
} = partnerSlice.actions;

export default partnerSlice.reducer;
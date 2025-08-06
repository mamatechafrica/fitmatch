import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export interface PartnerData {
  id?: string;
  companyName?: string;
  email?: string;
  contactPerson?: string;
  phone?: string;
  website?: string;
  description?: string;
  logo?: string;
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
  partnerData: PartnerData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  partnerData: null,
  isLoading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setPartnerData: (state, action: PayloadAction<PartnerData | null>) => {
      state.partnerData = action.payload;
      state.error = null;
    },
    updatePartnerData: (state, action: PayloadAction<Partial<PartnerData>>) => {
      if (state.partnerData) {
        state.partnerData = { ...state.partnerData, ...action.payload };
      }
    },
    resetPartnerData: (state) => {
      state.partnerData = null;
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
// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEsEFREav56tS7tOQq9V9fOo6Pg8zAnqg",
  authDomain: "fit-match-6930a.firebaseapp.com",
  databaseURL:
    "https://fit-match-6930a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fit-match-6930a",
  storageBucket: "fit-match-6930a.firebasestorage.app",
  messagingSenderId: "925031854161",
  appId: "1:925031854161:web:97d27bc6fd03b2c9c88870",
  measurementId: "G-B964WWCCKT",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(firebaseApp);

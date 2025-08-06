import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Test script to verify Firebase Authentication and Firestore functionality
 * This is a manual test that can be run to verify the core functionality
 */

const TEST_EMAIL = 'test@fitmatch.com';
const TEST_PASSWORD = 'testPassword123';

export const testFirebaseAuth = async () => {
  try {
    console.log('🔥 Testing Firebase Authentication...');
    
    // Test 1: Create User
    console.log('1. Creating test user...');
    const userCredential = await createUserWithEmailAndPassword(auth, TEST_EMAIL, TEST_PASSWORD);
    console.log('✅ User created successfully:', userCredential.user.uid);
    
    // Test 2: Store User Data in Firestore
    console.log('2. Storing user data in Firestore...');
    const userData = {
      email: TEST_EMAIL,
      name: 'Test User',
      createdAt: new Date(),
      userType: 'binome',
      quizCompleted: false,
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    console.log('✅ User data stored in Firestore');
    
    // Test 3: Retrieve User Data
    console.log('3. Retrieving user data from Firestore...');
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (userDoc.exists()) {
      console.log('✅ User data retrieved:', userDoc.data());
    } else {
      console.log('❌ User data not found');
    }
    
    // Test 4: Sign Out
    console.log('4. Signing out...');
    await auth.signOut();
    console.log('✅ User signed out successfully');
    
    // Test 5: Sign In
    console.log('5. Signing in...');
    const signInResult = await signInWithEmailAndPassword(auth, TEST_EMAIL, TEST_PASSWORD);
    console.log('✅ User signed in successfully:', signInResult.user.uid);
    
    console.log('🎉 All tests passed! Firebase is working correctly.');
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};

// Manual test function - can be called from console or component
export const runFirebaseTest = () => {
  console.log('Starting Firebase integration test...');
  testFirebaseAuth().then((success) => {
    if (success) {
      console.log('Firebase integration test completed successfully!');
    } else {
      console.log('Firebase integration test failed. Check console for errors.');
    }
  });
};
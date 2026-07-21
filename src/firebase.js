// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC65EmYx40CwqllF4FM3zxAUljiVxuyuOA",
  authDomain: "devportfolio-1c067.firebaseapp.com",
  projectId: "devportfolio-1c067",
  storageBucket: "devportfolio-1c067.firebasestorage.app",
  messagingSenderId: "1087738302292",
  appId: "1:1087738302292:web:a0cdf1a561be7a567682c1",
  measurementId: "G-PMMN8QCMEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Lazy Firestore database loader
let dbInstance = null;
export const getDb = async () => {
  if (!dbInstance) {
    const { getFirestore } = await import('firebase/firestore');
    dbInstance = getFirestore(app);
  }
  return dbInstance;
};

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

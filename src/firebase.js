// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_-qiYmCV-vg3GUXSTOSf3SqPXikK1SCU",
  authDomain: "litsoc-leaderboard.firebaseapp.com",
  projectId: "litsoc-leaderboard",
  storageBucket: "litsoc-leaderboard.firebasestorage.app",
  messagingSenderId: "601001648101",
  appId: "1:601001648101:web:e0507ef3f34b300ab6d90c",
  measurementId: "G-1VZRCCENEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);

// Export db so other files can import it


// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyXylHJ9HRkA0vCCgeSzxPezWiswinlQg",
  authDomain: "spending-tracker-9c6e0.firebaseapp.com",
  projectId: "spending-tracker-9c6e0",
  storageBucket: "spending-tracker-9c6e0.firebasestorage.app",
  messagingSenderId: "614415994251",
  appId: "1:614415994251:web:1bd3014e1f16ed9fb2738e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

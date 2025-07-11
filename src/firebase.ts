import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbzk13AY8OitKdKDhyBngDdwDqX0clPRE",
  authDomain: "test-firebase-db-project-1dccc.firebaseapp.com",
  projectId: "test-firebase-db-project-1dccc",
  storageBucket: "test-firebase-db-project-1dccc.firebasestorage.app",
  messagingSenderId: "1078964232678",
  appId: "1:1078964232678:web:23699a340bfa86bc767627",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

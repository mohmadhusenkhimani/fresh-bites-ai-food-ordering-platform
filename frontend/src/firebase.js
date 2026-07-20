import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASpOevvm2sVWum8OkKmGCvZWOy82XqDTs",
  authDomain: "food-aebaa.firebaseapp.com",
  projectId: "food-aebaa",
  storageBucket: "food-aebaa.firebasestorage.app",
  messagingSenderId: "17702674190",
  appId: "1:17702674190:web:757ffbe27e95a4d20a815f",
  measurementId: "G-DV7HE13MBM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
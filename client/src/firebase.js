// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f0158.firebaseapp.com",
  projectId: "mern-estate-f0158",
  storageBucket: "mern-estate-f0158.appspot.com",
  messagingSenderId: "1097380911133",
  appId: "1:1097380911133:web:6f460418816995f5860ef4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
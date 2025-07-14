import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-25c31.firebaseapp.com",
  projectId: "mern-blog-25c31",
  storageBucket: "mern-blog-25c31.firebasestorage.app",
  messagingSenderId: "484617825585",
  appId: "1:484617825585:web:65baf184cef4384c821410",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

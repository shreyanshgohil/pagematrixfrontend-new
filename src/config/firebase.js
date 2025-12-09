// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8esG7V6ka5FIIhIulSZiDb6G7XC3x_68",
  authDomain: "page-speed-97a81.firebaseapp.com",
  projectId: "page-speed-97a81",
  storageBucket: "page-speed-97a81.firebasestorage.app",
  messagingSenderId: "213849944574",
  appId: "1:213849944574:web:4d5b922572219148ae50af",
  measurementId: "G-3KVVFJBPFQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (only in browser)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;


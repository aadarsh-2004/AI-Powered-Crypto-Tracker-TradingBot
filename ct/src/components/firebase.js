
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdJnNdidffJ2OESgAPEAWcHZs6Zzmw-jg",
  authDomain: "crypto-tracker-auth-2e975.firebaseapp.com",
  projectId: "crypto-tracker-auth-2e975",
  storageBucket: "crypto-tracker-auth-2e975.firebasestorage.app",
  messagingSenderId: "19156628434",
  appId: "1:19156628434:web:e10420a8a76aee9de90e0b",
  measurementId: "G-CF3FC0TBLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Set persistence to localStorage
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistence set to localStorage");
    })
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });
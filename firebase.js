// Firebase SDK imports (modular v10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// AUTH IMPORTS (IMPORTANT)
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Your Firebase configuration (YOU PROVIDED THIS)
const firebaseConfig = {
    apiKey: "AIzaSyDtqElFFv-w5Rir-lSd2H-1pBaoYewIpp0",
    authDomain: "study-resource-hub-50eb0.firebaseapp.com",
    projectId: "study-resource-hub-50eb0",
    storageBucket: "study-resource-hub-50eb0.firebasestorage.app",
    messagingSenderId: "1037769543536",
    appId: "1:1037769543536:web:89b5c9f7367e2eccda89b5",
    measurementId: "G-ZJFJKL53Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export everything you need
export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
};
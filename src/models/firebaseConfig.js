import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCq7i_gjRgE7hfeb8KKYUVpBGdoFEc0S3E",
    authDomain: "espacosilmararegina-40152.firebaseapp.com",
    projectId: "espacosilmararegina-40152",
    storageBucket: "espacosilmararegina-40152.firebasestorage.app",
    messagingSenderId: "716292648402",
    appId: "1:716292648402:web:a049c535e5aa958eb4ec0b",
    measurementId: "G-72N77SMS4X"
};


let app;

// Check if a Firebase app has already been initialized
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

// Initialize Auth with persistence, ensuring it's only done once
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
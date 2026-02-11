
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCH7xBIYJIdRsUTKneBM-P49rf4m9ymwTg",
    authDomain: "portfolio-1d62c.firebaseapp.com",
    projectId: "portfolio-1d62c",
    storageBucket: "portfolio-1d62c.firebasestorage.app",
    messagingSenderId: "567637710062",
    appId: "1:567637710062:web:1ca83f45d6a068fe1ccfff"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

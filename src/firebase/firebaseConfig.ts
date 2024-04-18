// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCV3XV_XBwFT87AsAznMBLlawyd3uae_2g",
    authDomain: "umarket-70a6f.firebaseapp.com",
    projectId: "umarket-70a6f",
    storageBucket: "umarket-70a6f.appspot.com",
    messagingSenderId: "207849403163",
    appId: "1:207849403163:web:e8457aabe834cd3f8159be",
    measurementId: "G-W5VT33522B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Get the auth instance from the initialized app
const db = getFirestore(app);  // Get the firestore instance from the initialized app

export { app, auth, db };
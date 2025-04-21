// src/firebase/firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArDgNDx91akQK3XZ5_BEQo2KIwwtdNZx0",
  authDomain: "launchpad-706af.firebaseapp.com",
  projectId: "launchpad-706af",
  storageBucket: "launchpad-706af.appspot.com",
  messagingSenderId: "546430315077",
  appId: "1:546430315077:web:6ffa384ccb628ad6f3112c",
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Auth + Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Initialize Firestore
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };

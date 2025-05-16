// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-storage.js";
import { getDatabase, ref as dbRef, set } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";  // Real-time Database

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDCM_ednUvxNqRKVMtUgy7fCOq275SsI8k",
  authDomain: "memes-64a42.firebaseapp.com",
  databaseURL: "https://memes-64a42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "memes-64a42",
  storageBucket: "memes-64a42.firebasestorage.app",
  messagingSenderId: "856854598842",
  appId: "1:856854598842:web:253105accbb49c9ce15e83",
  measurementId: "G-RG54LZH34E"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);  // Firestore
export const storage = getStorage(app);  // Storage
export const realTimeDb = getDatabase(app);  // Realtime Database
export const memesRef = collection(db, "memes");
export const memesRefRealTime = dbRef(realTimeDb, "memes");  // Realtime Database reference   
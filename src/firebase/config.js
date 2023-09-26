// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFireStore } from './firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1s86FpX2zwIHHdG4tuYCHw9cEFhY1New",
  authDomain: "journal-app-97099.firebaseapp.com",
  projectId: "journal-app-97099",
  storageBucket: "journal-app-97099.appspot.com",
  messagingSenderId: "969249958337",
  appId: "1:969249958337:web:4de917cbd9f3ee3dd22740"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFireStore(FirebaseApp)
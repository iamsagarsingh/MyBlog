// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCrKJ-tCCKUDFBZcVWBNZuMc9C_BxADxgE",
  authDomain: "my-articles-4c670.firebaseapp.com",
  projectId: "my-articles-4c670",
  storageBucket: "my-articles-4c670.appspot.com",
  messagingSenderId: "339802483905",
  appId: "1:339802483905:web:fb3deab720eb78d136b840"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
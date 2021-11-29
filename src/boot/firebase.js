import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  // I actually can't believe I have to work like this. I am not storing the env vars with quotation marks.
  apiKey: process.env.FIREBASE_KEY.substring(1, process.env.FIREBASE_KEY.length - 1),
  authDomain: process.env.AUTHDOMAIN.substring(1, process.env.AUTHDOMAIN.length - 1),
  projectId: process.env.PROJECTID.substring(1, process.env.PROJECTID.length - 1),
  storageBucket: process.env.STORAGEBUCKET.substring(1, process.env.STORAGEBUCKET.length - 1),
  messagingSenderId: process.env.MESSAGINGSENDERID.substring(1, process.env.MESSAGINGSENDERID.length - 1),
  appId: process.env.APPID.substring(1, process.env.APPID.length - 1)
};

const app = initializeApp(firebaseConfig)
const db = getFirestore();
const auth = getAuth();

export default db
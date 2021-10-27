import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEsVhizNG6Z236cnbnIDJ8zKV4yQoKcm8",
  authDomain: "session-staff-hooks.firebaseapp.com",
  projectId: "session-staff-hooks",
  storageBucket: "session-staff-hooks.appspot.com",
  messagingSenderId: "712566799585",
  appId: "1:712566799585:web:e496475c49112876d14ba0",
  measurementId: "G-6CS97P54NR",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const storage = getStorage(app);

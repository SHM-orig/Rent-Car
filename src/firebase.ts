// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwA2zWgX5XDT39UHacSsZQRO82k3q3Bs0",
  authDomain: "project-car-no2.firebaseapp.com",
  projectId: "project-car-no2",
  storageBucket: "project-car-no2.firebasestorage.app",
  messagingSenderId: "439207882742",
  appId: "1:439207882742:web:fadc79d3da391f0afca1d7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
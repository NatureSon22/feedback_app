import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-f30c2.firebaseapp.com",
  projectId: "mern-auth-f30c2",
  storageBucket: "mern-auth-f30c2.appspot.com",
  messagingSenderId: "254748026894",
  appId: "1:254748026894:web:7a7f92be8820ce5f05745f",
};

export const app = initializeApp(firebaseConfig);

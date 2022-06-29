import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCSFY7bCZ3rnkBx-w0VGaFLanpvR72Tn4g",
  authDomain: "virtual-wallet-95a8f.firebaseapp.com",
  projectId: "virtual-wallet-95a8f",
  storageBucket: "virtual-wallet-95a8f.appspot.com",
  messagingSenderId: "607656454198",
  appId: "1:607656454198:web:d4b5c21e58ed026abf5097"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
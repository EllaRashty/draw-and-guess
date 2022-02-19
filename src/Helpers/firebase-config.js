// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getStorage}from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPtbhYwL4s8KuT-DVc0wcIx0vtOrnTtoQ",
  authDomain: "draw-guess-86bcc.firebaseapp.com",
  projectId: "draw-guess-86bcc",
  storageBucket: "draw-guess-86bcc.appspot.com",
  messagingSenderId: "3084936981",
  appId: "1:3084936981:web:00d68a6fe62e4be498eb1c",
  measurementId: "G-QSSQBPS0JJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);
export {storage,db ,app };
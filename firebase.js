// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9hCId5DkRZK6YdSgZnm1jkTXXBQT-7fY",
  authDomain: "be-dazzler.firebaseapp.com",
  projectId: "be-dazzler",
  storageBucket: "be-dazzler.appspot.com",
  messagingSenderId: "91028208060",
  appId: "1:91028208060:web:c23bc63644b2b7975f13b9",
  measurementId: "G-502CGFSPNV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

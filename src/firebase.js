// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIXptVGz02ekvAdId0LqGbmY6ORRBZYaA",
  authDomain: "domore-154cc.firebaseapp.com",
  databaseURL: "https://domore-154cc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "domore-154cc",
  storageBucket: "domore-154cc.firebasestorage.app",
  messagingSenderId: "67408089829",
  appId: "1:67408089829:web:4fb049ab3a99f7bb8ffa0c",
  measurementId: "G-4XHQHT75KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
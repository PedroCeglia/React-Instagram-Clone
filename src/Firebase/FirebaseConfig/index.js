// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase} from "firebase/database"
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvzbK8by8oZgphYsbyfUjxyXEVCaaUEXI",
  authDomain: "instagram-clone-d6859.firebaseapp.com",
  databaseURL: "https://instagram-clone-d6859-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-d6859",
  storageBucket: "instagram-clone-d6859.appspot.com",
  messagingSenderId: "940753980647",
  appId: "1:940753980647:web:ab6b98a9f4d9aaf5dae642",
  measurementId: "G-RLKV9CG9NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
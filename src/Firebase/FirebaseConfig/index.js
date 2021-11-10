// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase} from "firebase/database"
import {getAuth} from "firebase/auth"

// Import V8
import firebase from 'firebase/compat/app';
// Compat Version Storage
import 'firebase/compat/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase V9
const app = initializeApp(firebaseConfig);

// Initialize Compat Version
firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = firebase.storage()
export const storageEvent = firebase.storage.TaskEvent.STATE_CHANGED
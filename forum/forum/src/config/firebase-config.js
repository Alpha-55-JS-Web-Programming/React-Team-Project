// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFdNNpJKkQ7FfN12MTnVJFY90WZwHmTeA",
  authDomain: "health-wellness-project-90261.firebaseapp.com",
  projectId: "health-wellness-project-90261",
  storageBucket: "health-wellness-project-90261.appspot.com",
  messagingSenderId: "833535286049",
  appId: "1:833535286049:web:92df25584550019335bc60",
  databaseURL:"https://health-wellness-project-90261-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);

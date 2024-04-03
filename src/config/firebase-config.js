// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMT894NEbdh5ua_PX29z2JEX2PcWjXi90",
  authDomain: "forum-health-wellness.firebaseapp.com",
  projectId: "forum-health-wellness",
  storageBucket: "forum-health-wellness.appspot.com",
  messagingSenderId: "453826420634",
  appId: "1:453826420634:web:55e38cf78cadc8a57ca423",
    databaseURL:'https://forum-health-wellness-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);

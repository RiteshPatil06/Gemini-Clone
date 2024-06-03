// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCasSFilR9yLcba_oI4pL1Vvg7FEO5oDQY",
  authDomain: "theguy-69.firebaseapp.com",
  projectId: "theguy-69",
  storageBucket: "theguy-69.appspot.com",
  messagingSenderId: "326416174453",
  appId: "1:326416174453:web:612cd782491344954e973c",
  measurementId: "G-FJD0N67B51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = app.firestore;
const auth = app.auth;

export {db, auth };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  apiKey: "AIzaSyCQv4bXGWdUPt2ggOxg4vOWd1CTZrLCCdo",
  authDomain: "travelagency-efd46.firebaseapp.com",
  projectId: "travelagency-efd46",
  storageBucket: "travelagency-efd46.appspot.com",
  messagingSenderId: "720651572682",
  appId: "1:720651572682:web:33576cdad72aefdf152b33",
  measurementId: "G-8KLHXSCJTL"
};

// Initialize Firebase
const app = initializeApp(environment);
const analytics = getAnalytics(app);
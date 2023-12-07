// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDP2I3T9B-DC18sRaO9_AzOFXMa-LlMlOk",
  authDomain: "netflixgpt-67394.firebaseapp.com",
  projectId: "netflixgpt-67394",
  storageBucket: "netflixgpt-67394.appspot.com",
  messagingSenderId: "574568509721",
  appId: "1:574568509721:web:eff0853b712348ce5a5588",
  measurementId: "G-02GBQ1FZ7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
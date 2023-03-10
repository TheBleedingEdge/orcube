// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOc_6F57KdwZc1IX6bC4IykymTbwUYxQ0",
  authDomain: "orcube-2c2fc.firebaseapp.com",
  projectId: "orcube-2c2fc",
  storageBucket: "orcube-2c2fc.appspot.com",
  messagingSenderId: "696951397057",
  appId: "1:696951397057:web:c249df9a6d7b0a774ad240",
  measurementId: "G-YJZ35GYL11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// Import the functions you need from the SDKs you need
import { initializeApp,getAuth } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQAFpisaz6J288Tcnpj9d4U-PfYh1-4V8",
  authDomain: "romodoro-app.firebaseapp.com",
  projectId: "romodoro-app",
  storageBucket: "romodoro-app.firebasestorage.app",
  messagingSenderId: "609772529451",
  appId: "1:609772529451:web:7f9fbff530308b3ed1476e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
import { initializeApp,getAuth } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_apiKey,
  authDomain: process.env.NEXT_APP_authDomain,
  projectId: process.env.NEXT_APP_projectId,
  storageBucket: process.env.NEXT_APP_storageBucket,
  messagingSenderId: process.env.NEXT_APP_messagingSenderId,
  appId: process.env.NEXT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
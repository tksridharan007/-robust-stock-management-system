import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJFwyrSWjxFiPQEYHthfl-8dGnX1BC8Ak",
    authDomain: "stockmarket-1f729.firebaseapp.com",
    projectId: "stockmarket-1f729",
    storageBucket: "stockmarket-1f729.appspot.com",
    messagingSenderId: "135151240657",
    appId: "1:135151240657:web:e15244f2131847321e0cf0",
    measurementId: "G-MWB79F18CW"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

export{db,auth, app}
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';


// Initialize Firebase
const firebaseApp = initializeApp(
  {
    apiKey: "AIzaSyAf7eI4PoZGqKo29AjRo1Q-Hnb0_eOthWg",
    authDomain: "product-list-525d2.firebaseapp.com",
    projectId: "product-list-525d2",
    storageBucket: "product-list-525d2.appspot.com",
    messagingSenderId: "505899981876",
    appId: "1:505899981876:web:25c71a7d99521fddeb3e61",
    measurementId: "G-Z6BSK4J3FY",
  }
);

export const db = getFirestore(firebaseApp);

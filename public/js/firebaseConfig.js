import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKUMdEdEzi3IxxBATPdVtTs9FSrjxqoT0",
  authDomain: "catering-reservation-sys-20778.firebaseapp.com",
  projectId: "catering-reservation-sys-20778",
  storageBucket: "catering-reservation-sys-20778.firebasestorage.app",
  messagingSenderId: "829885430935",
  appId: "1:829885430935:web:d9eecf759256c801a3bdd2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

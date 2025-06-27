import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCKUMdEdEzi3IxxBATPdVtTs9FSrjxqoT0",
  authDomain: "catering-reservation-sys-20778.firebaseapp.com",
  projectId: "catering-reservation-sys-20778",
  storageBucket: "catering-reservation-sys-20778.firebasestorage.app",
  messagingSenderId: "829885430935",
  appId: "1:829885430935:web:d9eecf759256c801a3bdd2"
};


// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register function
export async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const role = document.getElementById('role').value;

  if (!name || !email || !password || !role) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role
    });
    alert("Registration successful!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Registration error: " + error.message);
  }
}

// Login function
export async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      alert("No user data found!");
      return;
    }

    const userData = userDoc.data();
    const role = userData.role;

    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "user-dashboard.html";
    }

  } catch (error) {
    alert("Login error: " + error.message);
  }
}

// Make available in window scope for HTML inline onclick
window.register = register;
window.login = login;

import { auth, db } from './firebaseConfig.js';
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById('logoutBtn').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'index.html';
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('adminEmail').innerText = `Logged in as: ${user.email}`;
  } else {
    window.location.href = 'login.html';
  }
});

document.getElementById('uploadBtn').addEventListener('click', async () => {
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const description = document.getElementById('productDescription').value;

  if (name && price && description) {
    try {
      await addDoc(collection(db, "products"), {
        name,
        price,
        description,
        timestamp: Date.now()
      });
      alert("Product uploaded successfully!");
    } catch (error) {
      alert("Error uploading product: " + error.message);
    }
  }
});

document.getElementById('viewProductsBtn').addEventListener('click', async () => {
  const list = document.getElementById('productList');
  list.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement('div');
      item.className = "card";
      item.innerHTML = `<h3>${data.name}</h3><p>${data.description}</p><p>₹${data.price}</p>`;
      list.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading products:", err);
  }
});

document.getElementById('viewOrdersBtn').addEventListener('click', async () => {
  const list = document.getElementById('orderList');
  list.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement('div');
      item.className = "card";
      item.innerHTML = `<p><strong>User:</strong> ${data.user}</p><p><strong>Product:</strong> ${data.product}</p><p><strong>Qty:</strong> ${data.quantity}</p>`;
      list.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading orders:", err);
  }
});

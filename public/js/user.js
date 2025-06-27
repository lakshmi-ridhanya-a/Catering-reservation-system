import { auth, db } from './firebaseConfig.js';
import {
  signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  collection, addDoc, getDocs, query, where
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const userEmailSpan = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const viewProductsBtn = document.getElementById('viewProductsBtn');
const productList = document.getElementById('productList');

const openOrderFormBtn = document.getElementById('openOrderFormBtn');
const orderForm = document.getElementById('orderForm');
const orderEmail = document.getElementById('orderEmail');
const orderName = document.getElementById('orderName');
const orderProduct = document.getElementById('orderProduct');
const orderQuantity = document.getElementById('orderQuantity');
const orderTotal = document.getElementById('orderTotal');

const viewOrdersBtn = document.getElementById('viewMyOrdersBtn');
const userOrders = document.getElementById('userOrders');

const viewProfileBtn = document.getElementById('viewProfileBtn');
const userProfile = document.getElementById('userProfile');

let currentUser = null;
let productData = [];

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    userEmailSpan.textContent = user.email;
    orderEmail.value = user.email;
    orderName.value = user.displayName || 'User';
  } else {
    window.location.href = 'login.html';
  }
});

logoutBtn.onclick = () => signOut(auth).then(() => location.href = 'login.html');

viewProductsBtn.onclick = async () => {
  productList.innerHTML = '';
  orderProduct.innerHTML = '<option value="">Select Product</option>';

  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    productData = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      productData.push(data);

      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <h4>${data.name}</h4>
        <p>${data.description}</p>
        <p>₹${data.price}</p>
      `;
      productList.appendChild(div);

      const opt = document.createElement('option');
      opt.value = data.name;
      opt.dataset.price = data.price;
      opt.textContent = `${data.name} - ₹${data.price}`;
      orderProduct.appendChild(opt);
    });
  } catch (err) {
    console.error("Error loading products:", err);
    alert("Failed to load products. Check console for details.");
  }
};

openOrderFormBtn.onclick = () => {
  orderForm.style.display = 'block';
};

orderProduct.onchange = () => {
  const selected = orderProduct.selectedOptions[0];
  if (selected && selected.dataset.price) {
    const price = parseFloat(selected.dataset.price);
    const qty = parseInt(orderQuantity.value || 0);
    orderTotal.value = '₹' + (price * qty).toFixed(2);
  }
};

orderQuantity.oninput = orderProduct.onchange;

orderForm.onsubmit = async (e) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, 'orders'), {
      email: currentUser.email,
      name: currentUser.displayName || 'User',
      product: orderProduct.value,
      quantity: parseInt(orderQuantity.value),
      total: orderTotal.value,
      timestamp: new Date()
    });
    alert('Order placed!');
    orderForm.reset();
    orderForm.style.display = 'none';
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order.");
  }
};

viewOrdersBtn.onclick = async () => {
  userOrders.innerHTML = '';
  try {
    const q = query(collection(db, 'orders'), where('email', '==', currentUser.email));
    const snap = await getDocs(q);
    snap.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <h4>${data.product}</h4>
        <p>Quantity: ${data.quantity}</p>
        <p>Total: ${data.total}</p>
      `;
      userOrders.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading orders:", err);
    alert("Could not load your orders.");
  }
};

viewProfileBtn.onclick = () => {
  userProfile.innerHTML = `
    <div class="card">
      <p><strong>Email:</strong> ${currentUser.email}</p>
      <p><strong>Name:</strong> ${currentUser.displayName || 'User'}</p>
      <p><strong>Role:</strong> user</p>
    </div>
  `;
};

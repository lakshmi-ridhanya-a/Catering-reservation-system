# Catering-reservation-system

A web-based application that enables users to register, log in, view catering products, place orders, and manage their profiles. Admins can upload products and manage all user orders.

---

##  Features

###  User
- Register and Login
- View available catering products
- Place orders with quantity & price calculation
- View their own orders
- View and manage their profile

###  Admin
- View all registered users
- Upload new catering products
- View all orders placed by users

---

##  Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase Auth & Firestore
- **Hosting**: Firebase Hosting / GitHub Pages (optional)

---

##  Folder Structure

/public
├── css/
│ └── styles.css
├── js/
│ ├── auth.js
│ ├── user.js
│ ├── admin.js
│ └── firebaseConfig.js
├── admin-dashboard.html
├── user-dashboard.html
├── index.html
├── login.html
└── register.html


---

## Workflow

###  User Flow:
1. User registers and logs in
2. Views available products
3. Places an order
4. Views order history
5. Views personal profile info

###  Admin Flow:
1. Logs in
2. Uploads new products
3. Monitors all user orders

---

##  Running Locally

1. Clone the repository 
2. Open index.html in a browser (or host it with Firebase).


| Test Case ID | Description                    | Expected Output                   | Result     |
| ------------ | ------------------------------ | --------------------------------- | -----------|
| TC-001       | Register a new user            | Success message, user logged in   | Success    |
| TC-002       | Login with invalid credentials | Error message                     | Success    |
| TC-003       | View available products        | Product list loads from Firestore | Success    |
| TC-004       | Place order                    | Order is saved, total calculated  | Success    |
| TC-005       | Admin uploads product          | Product is saved in Firestore     | Success    |
| TC-006       | Admin views all orders         | Displays all user orders          | Success    |

## LLD (Low Level Design) Summary

1. Firebase Authentication to manage sessions.

2. Firestore collections used:

  - users (for storing user role and info)

  - products (uploaded by admin)

  - orders (placed by users)

## Sample Firestore Structure:

users/
  userId: {
    email: "abc@example.com",
    role: "user" | "admin"
  }

products/
  productId: {
    name: "Veg Thali",
    price: 250,
    description: "Delicious..."
  }

orders/
  orderId: {
    email: "...",
    product: "Veg Thali",
    quantity: 2,
    total: "₹500"
  }


## Architecture Design (Summary)

1. Frontend: Static HTML pages

2. Backend: Firebase for real-time database and authentication

3. Database: Firestore (NoSQL)

4. Client-Side Logic: JS modules for auth, admin, and user operations


## Optimization Suggestions

# Code Level:
Use modular JS (auth.js, user.js, etc.)

Avoid repeated DOM queries

Use event delegation if needed

# Architecture Level:

Use Firestore security rules for access control

Move to Firebase Cloud Functions for advanced backend logic

Consider adding Stripe/PayPal for payments in future

## License

This project is intended for academic and educational purposes. You may use and modify it with proper attribution.

## Author

Lakshmi Ridhanya A  
B.Tech Computer Science and Engineering  
Amrita Vishwa Vidyapeetham  




# 🛒 Cartello

A full-stack e-commerce platform that delivers a modern online shopping experience with product browsing, cart management, and admin control panel.

---

## Project Overview

Cartello is a full-stack e-commerce web application that provides a modern online shopping experience. Users can browse products, manage their cart, place orders, and track their order history through a personal dashboard.

---

## ⚡ Highlights
- Full-stack web application (Frontend + Backend)
- REST API built with Node.js & Express
- MongoDB Atlas integration (cloud database)
- Admin dashboard for product and order management
- Persistent cart using localStorage
- Deployed (Render + GitHub Pages)

---

## 🚀 Features

### 👤 Customer Features
- Browse products on Home and Shop pages
- Search and filter products by category
- Product modal with details, rating, and stock info
- Add / remove items from cart with quantity control
- Cart persists across pages using localStorage
- Checkout with form validation and Cash on Delivery (COD)
- Automatic shipping cost calculation based on governorate
- User registration and login connected to database
- Personal dashboard with profile, orders, addresses, and security tabs
- Edit name, email, and phone number
- Save and remove delivery addresses
- View order history with status tracking
- Cancel pending orders
- Change password

---

### 🛠️ Admin Features
- Protected admin dashboard (login required)
- View real-time stats — total sales, orders, users, products
- Add and delete products with image upload
- Manage and update order statuses
- View all registered users

---

### ⚙️ Technical Features
- Responsive design with mobile burger menu
- Products and users stored in MongoDB Atlas
- REST API built with Node.js and Express
- Deployed backend on Render
- Frontend hosted on GitHub Pages

---

## 🏗️ Architecture

Frontend (HTML/CSS/JS)  
        ↓  
Express REST API  
        ↓  
MongoDB Atlas Database  

---

## 🧰 Technologies Used

### Frontend:
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer (image upload)
- CORS
- dotenv

---

## 📁 Project Structure


cartello/
├── css/ # Stylesheets
├── js/
│ └── script.js # Main frontend logic
├── server/
│ ├── models/
│ │ ├── Product.js
│ │ ├── User.js
│ │ └── Order.js
│ └── server.js # Express API server
├── index.html
├── shop.html
├── cart.html
├── checkout.html
├── login.html
├── admin.html
└── package.json


---

## ▶️ How to Run Locally

### 1. Clone repository
git clone https://github.com/cartelloeg/cartello.git

### 2. Install dependencies
npm install

### 3. Setup environment variables
Create a `.env` file inside `/server`:


MONGODB_URI=your_mongodb_connection_string


### 4. Start backend server
node server/server.js

### 5. Open frontend
Use Live Server or open index.html in browser

---

## 🔐 Admin Access

Go to `login.html` → click **Admin login**
- Email: `admin@cartello.com`
- Password: `admin123`

---

## 👥 Team

| Name | Role |
|------|------|
| Ziad | Team Lead — setup, DB schemas, API routes |
| Youssef Ahmed | Auth system, password management |
| Youssef Wael | Orders, stock management |
| Rahaf | Frontend — address system, checkout, user dashboard |
| Malak | Frontend — admin panel, cart, product management |

---

## 👥 Team Contribution

| Name | Responsibility |
|------|----------------|
| Ziad | Team Lead — architecture, database, API design |
| Youssef Ahmed | Authentication system & password management |
| Youssef Wael | Orders system & stock management |
| Rahaf | Checkout system & user dashboard |
| Malak | Admin panel & product management |

---

## 🌐 Live Demo

- **Live Demo:** https://cartello-jx78.onrender.com
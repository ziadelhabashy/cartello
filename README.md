# Cartello — E-Commerce Web Application

## Project Overview

Cartello is a full-stack e-commerce web application providing a modern online shopping experience. Users can browse products, manage their cart, place orders, and track their order history through a personal dashboard.

---

## Features

### Customer Features
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

### Admin Features
- Protected admin dashboard (login required)
- View real-time stats — total sales, orders, users, products
- Add and delete products with image upload
- Manage and update order statuses
- View all registered users

### Technical Features
- Responsive design with mobile burger menu
- Products and users stored in MongoDB Atlas
- REST API built with Node.js and Express
- Deployed backend on Render
- Frontend hosted on GitHub Pages

---

## Technologies Used

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer (image upload)
- CORS
- dotenv

---

## Project Structure

```
cartello/
├── css/                  # Stylesheets
├── js/
│   └── script.js         # Main frontend logic
├── server/
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   └── server.js         # Express API server
├── index.html
├── shop.html
├── cart.html
├── checkout.html
├── login.html
├── admin.html
└── package.json
```

---

## How to Run Locally

**1. Clone the repository:**
```bash
git clone https://github.com/cartelloeg/cartello.git
cd cartello
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create a `.env` file inside the `server/` folder:**
```
MONGO_URI=your_mongodb_connection_string
```

**4. Start the server:**
```bash
node server/server.js
```

**5. Open the website:**
Open `index.html` with Live Server or any browser.

---

## Admin Access

Go to `login.html` → click **Admin login**
- Email: `admin@cartello.com`
- Password: `admin123`

---

## Team

| Name | Role |
| Ziad | Team Lead —  setup, DB schemas, API routes |
| Youssef Ahmed |  — Auth system, password management |
| Youssef Wael |  — Orders, stock management |
| Rahaf | Frontend — Address system, checkout, user dashboard |
| Malak | Frontend — Admin panel, cart, product management |

---

## Live Demo

- **Website:** https://cartelloeg.github.io/cartello
- **API:** https://cartello-jx78.onrender.com
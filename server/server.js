require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log("Error:", err));

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// SIGNUP - Register a new user
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }
    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res.status(201).json({
      message: "Account created successfully!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// LOGIN - Check user credentials
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account found with this email." });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    res.json({
      message: "Login successful!",
user: { id: user._id, name: user.name, email: user.email, phone: user.phone }    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// CHANGE PASSWORD
app.post('/api/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// UPDATE PROFILE
app.post('/api/update-profile', async (req, res) => {
   try {
    const { id, name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({
      message: "Profile updated!",
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PLACE ORDER
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, customer, cart, paymentMethod } = req.body;
    const productIds = Object.keys(cart);
    const productsFromDB = await Product.find({ _id: { $in: productIds } });

    let subtotal = 0;
    const items = productIds.map(id => {
      const product = productsFromDB.find(p => p._id.toString() === id);
      if (!product) return null;
      const qty = cart[id];
      subtotal += product.price * qty;
      return { productId: id, name: product.name, price: product.price, quantity: qty };
    }).filter(Boolean);

     await Promise.all(items.map(item =>
      Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } })
    ));

    const shippingRates = {
      Cairo: 50, Giza: 50, Alexandria: 70, Dakahlia: 80, Sharqia: 80, Monufia: 75,
      Qalyubia: 60, Beheira: 85, "Kafr El Sheikh": 85, Gharbia: 80, "Port Said": 90,
      Suez: 90, Ismailia: 85, Damietta: 85, Fayoum: 75, "Beni Suef": 80, Minya: 90,
      Assiut: 100, Sohag: 110, Qena: 120, Luxor: 130, Aswan: 140, "Red Sea": 120,
      "New Valley": 150, Matrouh: 120, "North Sinai": 130, "South Sinai": 140
    };
    const shipping = shippingRates[customer.governorate] || 0;
    const total = subtotal + shipping;

    const newOrder = new Order({ userId: userId || null, customer, items, subtotal, shipping, total, paymentMethod });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!", orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET orders for a user
app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// ADD ADDRESS
app.post('/api/add-address', async (req, res) => {
  try {
    const { userId, title, detail } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: { title, detail } } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ message: "Address added!", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// REMOVE ADDRESS
app.post('/api/remove-address', async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );
    res.json({ message: "Address removed!", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET addresses
app.get('/api/addresses/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// ADMIN - Get all orders
app.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADMIN - Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADMIN - Get all products
app.get('/api/admin/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADMIN - Delete product
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADMIN - Update order status
app.post('/api/admin/orders/:id/status', async (req, res) => {
 try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });

    // If cancelling, restore stock
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      await Promise.all(order.items.map(item =>
        Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } })
      ));
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADMIN - Add new product
app.post('/api/admin/products', async (req, res) => {
  try {
    const { name, price, stock, category, image, rating, description } = req.body;
    const newProduct = new Product({ name, price, stock, category, image, rating, description });
    await newProduct.save();
    res.status(201).json({ message: "Product added!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.listen(5000, () => console.log("Server is running on port 5000"));
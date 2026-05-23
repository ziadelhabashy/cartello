const Product = require('../models/Product');

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// GET /api/admin/products
exports.adminGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// POST /api/admin/products
exports.adminAddProduct = async (req, res) => {
  try {
    const { name, price, stock, category, image, rating, description } = req.body;

    if (!name || !price || stock === undefined || !category) {
      return res.status(400).json({ message: 'Name, price, stock, and category are required.' });
    }

    const newProduct = new Product({ name, price, stock, category, image, rating, description });
    await newProduct.save();
    res.status(201).json({ message: 'Product added!', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// PUT /api/admin/products/:id
exports.adminUpdateProduct = async (req, res) => {
  try {
    const { name, price, stock, category, image, rating, description } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, category, image, rating, description },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product updated!', product });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// DELETE /api/admin/products/:id
exports.adminDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

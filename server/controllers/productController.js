const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

//Get all product
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /api/admin/products
exports.adminGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST /api/admin/products
exports.adminAddProduct = async (req, res) => {
  try {
    const { name, price, stock, category, rating, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';

    if (!name || !price || stock === undefined || !category) {
      return res.status(400).json({ message: 'Name, price, stock, and category are required.' });
    }
    // check that price is a real number first
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: 'Price must be a positive number.' });
    }
    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({ message: 'Stock must be a positive number.' });
    }

    // check rating is between 0 and 5
    if (rating && (rating < 0 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 0 and 5.' });
    }

    const newProduct = new Product({ name, price, stock, category, image, rating, description });
    await newProduct.save();
    res.status(201).json({ message: 'Product added!', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT /api/admin/products/:id
exports.adminUpdateProduct = async (req, res) => {
  try {
    const { name, price, stock, category, rating, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    if (!name || !price || stock === undefined || !category) {
      return res.status(400).json({ message: 'Name, price, stock, and category are required.' });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({ message: 'Stock must be a positive number.' });
    }

    if (rating && (rating < 0 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 0 and 5.' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, category, image, rating, description },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product updated!', product });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE /api/admin/products/:id
exports.adminDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    // Delete the image file from disk
    if (product.image) {
      const filePath = path.join(__dirname, '..', product.image);
      fs.unlink(filePath, err => {
        if (err) console.error('Image delete failed:', err);
      });
    }

    res.json({ message: 'Product deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

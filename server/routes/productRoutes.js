const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/productController');

// Public
router.get('/products', productController.getAllProducts);

// Admin
router.get   ('/admin/products',     productController.adminGetAllProducts);
router.post  ('/admin/products',     productController.adminAddProduct);
router.put   ('/admin/products/:id', productController.adminUpdateProduct);
router.delete('/admin/products/:id', productController.adminDeleteProduct);

module.exports = router;

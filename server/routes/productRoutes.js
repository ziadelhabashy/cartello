const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/productController');

// Public
router.get('/',    productController.getAllProducts);

// Admin
router.get   ('/admin',     productController.adminGetAllProducts);
router.post  ('/admin',     productController.adminAddProduct);
router.put   ('/admin/:id', productController.adminUpdateProduct);
router.delete('/admin/:id', productController.adminDeleteProduct);

module.exports = router;

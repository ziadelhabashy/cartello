const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/productController');
const upload            = require('../upload');
const isAdmin           = require('../middleware/isAdmin');

router.get('/products',              productController.getAllProducts);
router.get('/admin/products',        isAdmin, productController.adminGetAllProducts);
router.post('/admin/products',       isAdmin, upload.single('image'), productController.adminAddProduct);
router.put('/admin/products/:id',    isAdmin, upload.single('image'), productController.adminUpdateProduct);
router.delete('/admin/products/:id', isAdmin, productController.adminDeleteProduct);

module.exports = router;
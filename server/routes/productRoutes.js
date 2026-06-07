const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/productController');
const upload            = require('../upload');

router.get('/products',              productController.getAllProducts);
router.get('/admin/products',        productController.adminGetAllProducts);
router.post('/admin/products',       upload.single('image'), productController.adminAddProduct);
router.put('/admin/products/:id', upload.single('image'), productController.adminUpdateProduct);
router.delete('/admin/products/:id', productController.adminDeleteProduct);

module.exports = router;
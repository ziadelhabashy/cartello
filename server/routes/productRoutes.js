const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/productController');
const upload            = require('../upload');
const isAdmin           = require('../middleware/isAdmin');
const multer            = require('multer');

// Wraps multer upload and catches file validation errors
function handleUpload(req, res, next) {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE')
        return res.status(400).json({ message: 'Image too large. Maximum size is 5MB.' });
      return res.status(400).json({ message: 'Upload error: ' + err.message });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}

router.get('/products',              productController.getAllProducts);
router.get('/admin/products',        isAdmin, productController.adminGetAllProducts);
router.post('/admin/products',       isAdmin, handleUpload, productController.adminAddProduct);
router.put('/admin/products/:id',    isAdmin, handleUpload, productController.adminUpdateProduct);
router.delete('/admin/products/:id', isAdmin, productController.adminDeleteProduct);

module.exports = router;
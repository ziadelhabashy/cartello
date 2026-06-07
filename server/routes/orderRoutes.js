const express         = require('express');
const router          = express.Router();
const orderController = require('../controllers/orderController');
const isAdmin = require('../middleware/isAdmin');

// User
router.post('/orders',              orderController.placeOrder);
router.get ('/orders/user/:userId', orderController.getUserOrders);

// Admin
router.get ('/admin/orders',isAdmin,          orderController.adminGetAllOrders);
router.post('/admin/orders/:id/status',isAdmin, orderController.adminUpdateOrderStatus);

module.exports = router;

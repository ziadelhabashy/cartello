const express         = require('express');
const router          = express.Router();
const orderController = require('../controllers/orderController');

// User
router.post('/orders',              orderController.placeOrder);
router.get ('/orders/user/:userId', orderController.getUserOrders);

// Admin
router.get ('/admin/orders',          orderController.adminGetAllOrders);
router.post('/admin/orders/:id/status', orderController.adminUpdateOrderStatus);

module.exports = router;

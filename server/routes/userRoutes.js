const express        = require('express');
const router         = express.Router();
const userController = require('../controllers/userController');

// Auth
router.post('/signup',          userController.signup);
router.post('/login',           userController.login);
router.post('/change-password', userController.changePassword);
router.post('/update-profile',  userController.updateProfile);

// Addresses
router.get ('/addresses/:userId', userController.getAddresses);
router.post('/add-address',       userController.addAddress);
router.post('/remove-address',    userController.removeAddress);


// Admin
router.post('/admin/login', userController.adminLogin);
router.get('/admin/users', userController.adminGetAllUsers);
router.delete('/admin/users/:id', userController.adminDeleteUser);

module.exports = router;

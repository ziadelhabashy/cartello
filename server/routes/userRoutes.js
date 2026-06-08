const express        = require('express');
const router         = express.Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middleware/isAdmin');

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
router.get('/admin/users',isAdmin, userController.adminGetAllUsers);
router.delete('/admin/users/:id',isAdmin, userController.adminDeleteUser);

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

module.exports = router;

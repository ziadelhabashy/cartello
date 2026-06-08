const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: {
     type: String,
     default: null
     },
  customer: {
    name:        String,
    email:       String,
    phone:       String,
    governorate: String,
    address:     String
  },
  items: [
    {
      productId: String,
      name:      String,
      price:     Number,
      quantity:  Number
    }
  ],
  subtotal:      Number,
  shipping:      Number,
  total:         Number,
  paymentMethod: String,
  status:    { 
    type: String,
    default: 'Pending' 
  },
  createdAt: {  
    type: Date,
    default: Date.now 
  }
});
module.exports = mongoose.model('Order', orderSchema);

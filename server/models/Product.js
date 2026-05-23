const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  image:       { type: String, default: '' },
  category:    { type: String, required: true },
  description: { type: String, default: '' },
  stock:       { type: Number, required: true, default: 0 },
  rating:      { type: Number, default: 0 },
  reviews:     { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);

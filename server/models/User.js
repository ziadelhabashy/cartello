const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
  },

 password: {
  type: String,
  required: [true, 'Password is required.'],
  minlength: [6, 'Password must be at least 6 characters.']
},

  phone: {
    type: String,
    default: '',
    trim: true
  },

  addresses: [
    {
      title: {
        type: String,
        trim: true
      },
      detail: {
        type: String,
        trim: true
      }
    }
  ],

   resetPasswordCode: {
    type: String
  },

  resetPasswordExpires: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('User', userSchema);

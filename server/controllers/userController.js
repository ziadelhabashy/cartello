const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);


exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: 'Account created successfully!',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
      }
    });
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No account found with this email.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    res.json({
      message: 'Login successful!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { isAdmin: true, email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ message: 'Admin login successful!', isAdmin: true, token });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials.' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const passwordMatches = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: 'Password updated successfully!' });
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'If this email exists, a reset code has been sent.' });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    await resend.emails.send({
      from: 'Cartello <no-reply@cartello.me>',
      to: user.email,
      subject: 'Cartello Password Reset Code',
      text: `Your password reset code is: ${resetCode}. This code expires in 15 minutes.`
    });

    res.json({ message: 'Reset code sent to your email.' });
  } catch (error) {
    console.error('forgotPassword error:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Email, code, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const user = await User.findOne({
      email,
      resetPasswordCode: code,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset code.' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ message: 'ID, name, and email are required.' });
    }

    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already used by another account.' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      message: 'Profile updated!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};


exports.adminGetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};


exports.addAddress = async (req, res) => {
  try {
    const { userId, title, detail } = req.body;

    if (!userId || !title || !detail) {
      return res.status(400).json({ message: 'userId, title, and detail are required.' });
    }
    if (title.length > 30) {
  return res.status(400).json({ message: 'Address title must be 30 characters or less.' });
}

if (detail.length < 8) {
  return res.status(400).json({ message: 'Address detail must be at least 8 characters.' });
}

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: { title, detail } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Address added!', addresses: user.addresses });
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};

exports.removeAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({ message: 'userId and addressId are required.' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Address removed!', addresses: user.addresses });
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user.addresses);
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};

exports.adminDeleteAllUsers = async (req, res) => {
  try {
    const { confirmText } = req.body;

    if (confirmText !== 'DELETE ALL USERS') {
      return res.status(400).json({
        message: 'Confirmation text is incorrect.'
      });
    }

    const result = await User.deleteMany({});

    res.json({
      message: 'All users deleted successfully.',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /api/signup
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

// POST /api/login
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

// POST /api/admin/login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.json({ message: 'Admin login successful!', isAdmin: true });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials.' });
  }
};

// POST /api/change-password
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

// POST /api/update-profile
exports.updateProfile = async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ message: 'ID, name, and email are required.' });
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

// GET /api/admin/users
exports.adminGetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};

// POST /api/add-address
exports.addAddress = async (req, res) => {
  try {
    const { userId, title, detail } = req.body;

    if (!userId || !title || !detail) {
      return res.status(400).json({ message: 'userId, title, and detail are required.' });
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

// POST /api/remove-address
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

// GET /api/addresses/:userId
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

// DELETE /api/admin/users/:id
exports.adminDeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted!' });
  } catch (error) {
res.status(500).json({ message: 'Server Error' });
  }
};
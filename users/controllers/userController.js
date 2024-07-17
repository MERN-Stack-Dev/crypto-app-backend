const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, additionalData } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    additionalData: additionalData || {}, // Handle additionalData
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      additionalData: user.additionalData,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// Authenticate user & get user data
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.password === password) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      additionalData: user.additionalData,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      additionalData: user.additionalData,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    // Ensure additionalData is an object
    if (req.body.additionalData) {
      user.additionalData = new Map([
        ...(user.additionalData ? Array.from(user.additionalData) : []),
        ...Object.entries(req.body.additionalData),
      ]);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      additionalData: updatedUser.additionalData,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Reset user password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Get specific data from user's additionalData
const getUserSpecificData = asyncHandler(async (req, res) => {
  const { id, key } = req.params;
  const user = await User.findById(id);

  if (user) {
    const value = user.additionalData.get(key);
    res.json({ [key]: value });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
  getUserSpecificData,
};

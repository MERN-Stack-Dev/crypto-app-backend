const asyncHandler = require('express-async-handler');
const {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
  resetUserPassword,
} = require('../services/userService');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, additionalData } = req.body;

  const userExists = await findUserByEmail(email);

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await createUser({
    name,
    email,
    password,
    additionalData: additionalData || {},
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

  const user = await findUserByEmail(email);

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
  const user = await findUserById(req.params.id);

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
  const updateData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    additionalData: req.body.additionalData,
  };

  const user = await updateUserById(req.params.id, updateData);

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

// Reset user password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await resetUserPassword(email, newPassword);

  if (user) {
    res.status(200).json({ message: 'Password reset successful' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Get specific data from user's additionalData
const getUserSpecificData = asyncHandler(async (req, res) => {
  const { id, key } = req.params;
  const user = await findUserById(id);

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

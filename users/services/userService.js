const User = require('../models/userModel');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const resetUserPassword = async (email, newPassword) => {
  const user = await User.findOne({ email });
  if (user) {
    user.password = newPassword;
    return await user.save();
  }
  return null;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
  resetUserPassword,
};

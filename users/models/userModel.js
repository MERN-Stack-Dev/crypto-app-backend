const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true, unique: true },
  password: { type: mongoose.Schema.Types.String, required: true },
  additionalData: { type: Map, of: mongoose.Schema.Types.String }, // Updated to use mongoose types
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const express = require('express');
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
} = require('../controllers/userController');
const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
router.post('/resetpassword', resetPassword);

module.exports = router;

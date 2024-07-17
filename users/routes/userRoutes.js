const express = require('express');
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
  getUserSpecificData,
} = require('../controllers/userController');
const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/resetpassword', resetPassword); // Move this above routes with :id
router.get('/:id/data/:key', getUserSpecificData);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);

module.exports = router;


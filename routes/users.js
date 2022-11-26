const router = require('express').Router();
// const { validateUserId, validateUser, validateAvatar } = require('../middlewares/validate');
const {
  getUsers, getUserById, updateAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUser, updateUser);

module.exports = router;

const router = require('express').Router();
const { validateUser } = require('../middlewares/validate');
const { updateUser, getCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUser, updateUser);

module.exports = router;

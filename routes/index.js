const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateSignIn, validateAuth } = require('../middlewares/validate');
const { signin, createUser } = require('../controllers/users');
const { HTTP404Error } = require('../errors/HTTP404Error');

router.post('/signup', validateSignIn, createUser);
router.post('/signin', validateAuth, signin);
router.use('/', auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: '🍪 cleared' }).end();
});
router.use('*', (req, res, next) => {
  next(new HTTP404Error(`По адресу ${req.baseUrl} ничего не нашлось`));
});

module.exports = router;

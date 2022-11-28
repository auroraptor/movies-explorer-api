const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateSignIn, validateAuth } = require('../middlewares/validate');
const { signin, createUser } = require('../controllers/users');
const { HTTP404Error } = require('../errors/HTTP404Error');
const baseURL = require('../utils/baseUrl');

router.post(`${baseURL}signup`, validateSignIn, createUser);
router.post(`${baseURL}signin`, validateAuth, signin);
router.use(`${baseURL}`, auth);
router.use(`${baseURL}users`, userRouter);
router.use(`${baseURL}movies`, movieRouter);
router.post(`${baseURL}signout`, (req, res) => {
  res.clearCookie('jwt').end();
});
router.use('*', (req, res, next) => {
  console.log('baseURL: ', req.baseUrl);
  next(new HTTP404Error(`По адресу ${req.baseUrl} ничего не нашлось`));
});

module.exports = router;

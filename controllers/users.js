const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { HttpStatusCode } = require('../utils/HttpStatusCode');
const { HTTP401Error } = require('../errors/HTTP401Error');
const { HTTP409Error } = require('../errors/HTTP409Error');
const { HTTP404Error } = require('../errors/HTTP404Error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hash });
    res.status(HttpStatusCode.OK).send(user);
  } catch (error) {
    if (error.message.includes('11000')) {
      next(new HTTP409Error(`${req.body.email} уже зарегестрирован`));
      return;
    }
    next(error);
  }
};

module.exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new HTTP401Error('Неправильные почта или пароль'));
      return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      next(new HTTP401Error('Неправильные почта или пароль'));
      return;
    }

    const token = jwt.sign({ id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : '🔐', { expiresIn: '7d' });

    res.status(HttpStatusCode.OK).cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    }).end();
  } catch (error) {
    next(error);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      next(new HTTP404Error('Пользователь не найден'));
      return;
    }
    res.status(HttpStatusCode.OK).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(user);
  } catch (error) {
    if (error.message.includes('11000')) {
      next(new HTTP409Error(`${req.body.email} уже зарегестрирован`));
      return;
    }
    next(error);
  }
};

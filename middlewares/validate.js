const { celebrate, Joi } = require('celebrate');
const { url } = require('../utils/regexps');

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/[a-f0-9]{24,24}/).length(24),
  }),
});

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().pattern(url),
    thumbnail: Joi.string().required().pattern(url),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required().unsafe().integer(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().pattern(/[a-f0-9]{24,24}/).length(24),
  }),
});

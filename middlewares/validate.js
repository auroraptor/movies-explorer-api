const { celebrate, Joi } = require('celebrate');
const { url } = require('../utils/regexps');

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
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
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.string(),
    description: Joi.string(),
    trailerLink: Joi.string().required().pattern(url),
    thumbnail: Joi.string().required().pattern(url),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    movieId: Joi.string().pattern(/[a-f0-9]{24,24}/).length(24),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().pattern(/[a-f0-9]{24,24}/).length(24),
  }),
});

const Movie = require('../models/movie');

const { HttpStatusCode } = require('../utils/HttpStatusCode');
const { HTTP404Error } = require('../errors/HTTP404Error');
const { HTTP403Error } = require('../errors/HTTP403Error');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(HttpStatusCode.OK).send(movies);
  } catch (error) {
    next(error);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    res.status(HttpStatusCode.OK).send(movie);
  } catch (error) {
    next(error);
  }
};

module.exports.removeMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (movie === null) {
      next(new HTTP404Error(`Карточка с id ${req.params.movieId} не найдена`));
      return;
    } if (movie.owner.toHexString() !== req.user._id) {
      next(new HTTP403Error('Можно удалять только свои фильсы'));
      return;
    }
    await movie.delete();
    res.status(HttpStatusCode.OK).send({ message: `Фильм с id ${req.params.movieId} удалён` });
  } catch (error) {
    next(error);
  }
};

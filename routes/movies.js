const router = require('express').Router();
const { validateMovie, validateMovieId } = require('../middlewares/validate');
const { createMovie, getMovies, removeMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieId, removeMovie);

module.exports = router;

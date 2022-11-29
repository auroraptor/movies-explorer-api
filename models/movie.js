const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    director: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    duration: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    year: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    trailerLink: {
      type: mongoose.Schema.Types.String,
      required: true,
      validate: {
        validator(link) {
          return validator.isURL(link);
        },
        message: 'Is not a valid URL',
      },
    },
    thumbnail: {
      type: mongoose.Schema.Types.String,
      required: true,
      validate: {
        validator(link) {
          return validator.isURL(link);
        },
        message: 'Is not a valid URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    nameRU: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    nameEN: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Movie', movieSchema);

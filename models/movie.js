const mongoose = require('mongoose');
const { isURL } = require('validator');

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
    image: {
      type: mongoose.Schema.Types.String,
      required: true,
      validate: {
        validator: (link) => isURL(link),
        message: 'Is not a valid image link',
      },
    },
    trailerLink: {
      type: mongoose.Schema.Types.String,
      required: true,
      validate: {
        validator: (link) => isURL(link),
        message: 'Is not a valid trailer link',
      },
    },
    thumbnail: {
      type: mongoose.Schema.Types.String,
      required: true,
      validate: {
        validator: (link) => isURL(link),
        message: 'Is not a valid thumbnail link',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.Number,
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
  { versionKey: false },
);

movieSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model('Movie', movieSchema);

/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: mongoose.Schema.Types.String,
    require: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Is not a valid email address',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

module.exports = mongoose.model('User', userSchema);

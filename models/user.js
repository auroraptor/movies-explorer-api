const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
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
        validator: (email) => isEmail(email),
        message: 'Is not a valid email address',
      },
    },
    password: {
      type: String,
      select: false,
      require: true,
    },
  },
  { versionKey: false },
);

userSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    delete ret._id;
  },
});

module.exports = mongoose.model('User', userSchema);

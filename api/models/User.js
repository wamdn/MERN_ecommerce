import mongoose, { Schema, model } from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';
import { emailRegex, nameRegex } from '../utility/regex';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      match: nameRegex,
      required: true,
      minlength: 3,
      maxlength: 32
    },
    email: {
      type: String,
      trim: true,
      match: emailRegex,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 32
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    about: {
      type: String,
      trim: true,
      maxlength: 150
    },
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

/* --------------- virtual fields -------------- */

userSchema
  .virtual('password')
  .set(function (password) {
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.hashed_password;
  });

userSchema.virtual('id').get(function () {
  return this._id;
});

/* ------------------ methods ----------------- */
//? we can also use bcrypt instade of the crypto core module
/**
 * Hash a password using sha256 algorithm
 *
 * @param {string} plainPassword the password that will be hashed
 * @returns {string} return the hashed password
 */
userSchema.methods.encryptPassword = function (plainPassword) {
  if (!plainPassword) return '';

  try {
    return crypto.createHmac('sha256', this.salt).update(plainPassword).digest('hex');
  } catch (err) {
    return '';
  }
};

/**
 * Check if the password giving and the hashed password for the database are the
 * same
 *
 * @param {string} plainPassword
 * @returns {boolean} true if password is valid, if not return false
 */
userSchema.methods.authenticate = function (plainPassword) {
  const temp = this.encryptPassword(plainPassword);
  return temp === this.hashed_password;
};

const User = model('User', userSchema);

export default User;

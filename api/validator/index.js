import { body, validationResult } from 'express-validator';
import { emailRegex, nameRegex } from '../utility/regex';

export const usernameValidation = body('name', 'Name is required')
  .notEmpty()
  .isLength({ min: 3, max: 32 })
  .withMessage('Name must contain between 3 and 32 characters')
  .matches(nameRegex)
  .withMessage('Name must contain only letters, numbers or the underscore character');

export const emailValidation = body('email', 'Email is not valid')
  //.normalizeEmail()
  .matches(emailRegex)
  .isLength({ min: 3, max: 32 })
  .withMessage('Email must contain between 3 and 32 characters');

export const passwordValidation = body('password', 'Password is required')
  .notEmpty()
  .isLength({ min: 5, max: 50 })
  .withMessage('Password must contain between 6 and 50 characters')
  .matches(/\d/)
  .withMessage('Password must contain a number');

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

export const signupValidation = [usernameValidation, emailValidation, passwordValidation, validator];

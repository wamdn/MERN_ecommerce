import jwt from 'jsonwebtoken'; // to generate signed token
import expressJwt from 'express-jwt'; // for authorization check
import User from '../models/User';
import { errorHandler } from '../helpers/dbErrorHandler';

// Create a new user in the database
// or return errors with status code 400 Bad request
export const signup = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(user => {
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({ user });
    })
    .catch(err => res.status(400).json({ errors: [errorHandler(err)] }));
};

// Login the user
// or return errors with status code 401 Unauthorized
export const signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      const { id, name, role } = user;

      // verify that the password match
      if (!user.authenticate(password)) {
        return res.status(401).json({ errors: ['Incorrect email or password'] });
      }

      // generate a signed token with id and secret
      const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '9999' });

      // presist the token a 't' in the cookie with an expiry date
      res.cookie('t', token, { expire: new Date() + 9999 });

      // return the response with user and token to the client
      res.json({ token, user: { id, email, name, role } });
    })
    .catch(() => res.status(401).json({ errors: ['Incorrect email or password'] }));
};

// Logout user by invalidating jwt token
export const signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout success' });
};

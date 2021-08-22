import User from '../models/User';

export const addUserToRequest = (req, res, next, userId) => {
  if (!userId) next(new Error('Hello from addUserToRequest()'));

  User.findById(userId)
    .then(user => {
      req.profile = user;
      next();
    })
    .catch(err => {
      res.status(404).json({ errors: ['User not found'], err });
    });
};

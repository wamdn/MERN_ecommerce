import express from 'express';
import { requiresSignin, isAuth, isAdmin } from '../controllers/auth';
import { addUserToRequest } from '../controllers/user';

const router = express.Router();

// add user in req.profile
router.param('userId', addUserToRequest);

router.get('/secret/:userId', requiresSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

export default router;

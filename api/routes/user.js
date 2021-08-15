import express from 'express';
import { signup, signin, signout } from '../controllers/user';
import { signupValidation } from '../validator/index';

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/signin', signin);
router.post('/signout', signout);

export default router;

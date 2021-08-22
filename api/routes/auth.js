import express from 'express';
import { signup, signin, signout } from '../controllers/auth';
import { signupValidation } from '../validator/index';

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/signin', signin);
router.get('/signout', signout);

export default router;

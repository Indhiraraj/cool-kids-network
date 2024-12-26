import { Router } from 'express';
import {
  registerUser,
  loginUser,
  loginMainatiner
} from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/login-maintainer', loginMainatiner);

export { router as authRouter };

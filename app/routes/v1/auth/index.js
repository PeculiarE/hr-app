import { Router } from 'express';
import AuthController from '../../../controllers';
import ValidationMiddleware from '../../../middlewares';
import { signUpSchema, signInSchema } from '../../../validations';

const { signUp, signIn } = AuthController;
const { validate } = ValidationMiddleware;
const router = Router();

router.post(
  '/signup',
  validate(signUpSchema),
  signUp
);

router.post(
  '/signin',
  validate(signInSchema),
  signIn
);

export default router;

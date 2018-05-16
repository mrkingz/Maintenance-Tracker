import express from 'express';
import UserController from '../controllers/usercontroller';
import validations from '../validations';

const authRouter = express.Router();
const { UserValidations } = validations;

authRouter.post('/api/v1/users/signup',
  UserValidations.isRequired(),
  UserValidations.isUique('Username'),
  UserValidations.isUique('Email'),
  UserValidations.isValidEmail(),
  UserController.signup());

authRouter.post('/api/v1/users/signin', 
  UserController.signin());

export default authRouter;

import express from 'express';
import UserController from '../controllers/userController';
import validations from '../validations';

const authRouter = express.Router();
const { UserValidations } = validations;

authRouter.post('/api/v1/auth/signup',
  UserValidations.isRequired(),
  UserValidations.validateSignupDetails(),  
  UserValidations.isUnique('Username'),
  UserValidations.isUnique('Email'),
  UserController.signup());

authRouter.post('/api/v1/auth/signin', 
  UserController.signin());

authRouter.patch('/api/v1/auth/credentials', 
  UserController.authenticateUser(),
  UserController.authorizeUser(),
  UserValidations.isRequired(),
  UserValidations.validateSignupDetails(),
  UserValidations.isUnique('Username'),
  UserValidations.isUnique('Email'),
  UserController.updateAdminCredentials());

  authRouter.put('/api/v1/auth/password', 
  UserController.authenticateUser(),
  UserValidations.validatePassword(),
  UserController.resetPassword());

  authRouter.get('/api/v1/users/:email/confirm', 
  UserValidations.validateEmail(),
  UserController.confirmEmail());

export default authRouter;

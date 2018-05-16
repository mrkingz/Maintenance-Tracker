import express from 'express';
import UserController from '../controllers/usercontroller';
import validations from '../validations';

const authRouter = express.Router();
const { UserValidations } = validations;

authRouter.post('/api/v1/users',
UserValidations.isRequired(),
UserValidations.isUique('Username'),
UserValidations.isUique('Email'),
 UserController.signup());

export default authRouter;

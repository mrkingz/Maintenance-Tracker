import express from 'express';
import UserController from '../controllers/usercontroller';

console.log(UserController);
const authRouter = express.Router();

authRouter.post('/api/v1/users', UserController.signup());

export default authRouter;

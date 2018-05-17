import express from 'express';
import controllers from '../controllers';
import validations from '../validations';

const {
		RequestController,
		UserController,
} = controllers;
const { RequestValidations } = validations;

const requestRouter = express.Router();

requestRouter.post('/api/v1/users/requests',
	UserController.authenticateUser(),
	RequestValidations.validateRequest(),
  RequestController.createRequest()
);
export default requestRouter;
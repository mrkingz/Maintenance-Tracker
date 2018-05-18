import express from 'express';
import controllers from '../controllers';
import validations from '../validations';

const {
		RequestController,
		UserController,
} = controllers;
const { RequestValidations } = validations;

const requestRouter = express.Router();

requestRouter.route('/api/v1/users/requests')
.all(UserController.authenticateUser())
.post(RequestValidations.validateRequest(),
	RequestController.createRequest())
.get(RequestController.getUsersRequests());

requestRouter.get('/api/v1/users/requests/:requestId(\\d+)', 
	UserController.authenticateUser(),
	RequestController.getUserRequest());

requestRouter.put('/api/v1/users/requests/:requestId', 
	UserController.authenticateUser(),
	UserController.authorizeUser(),
	RequestController.updateRequest());
	
export default requestRouter;

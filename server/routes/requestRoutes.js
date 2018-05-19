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

requestRouter.route('/api/v1/users/requests/:requestId(\\d+)')
.all(UserController.authenticateUser())
.put(UserController.authorizeUser(),
	RequestController.updateRequest())
.delete(RequestController.deleteRequest());
	
export default requestRouter;

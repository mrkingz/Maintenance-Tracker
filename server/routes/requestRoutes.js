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
.get(UserController.authorizeUser({ isAdmin: false }),
  RequestController.filterRequests(),
  RequestController.getRequests());

requestRouter.get('/api/v1/requests',
  UserController.authenticateUser(),
  UserController.authorizeUser({ isAdmin: true }),
  RequestController.filterRequests(),
  RequestController.getRequests());

requestRouter.route('/api/v1/users/requests/:requestId(\\d+)')
.all(UserController.authenticateUser())
.get(RequestController.getUserRequest())
.put(UserController.authorizeUser(),
  RequestValidations.validateRequest(),
	RequestController.updateRequest())
.delete(RequestController.deleteRequest());

requestRouter.put('/api/v1/requests/:requestId/approve',
  UserController.authenticateUser(),
  UserController.authorizeUser(),
  RequestController.updateRequestStatus('Approved'));

requestRouter.put('/api/v1/requests/:requestId/disapprove',
  UserController.authenticateUser(),
  UserController.authorizeUser(),
  RequestController.updateRequestStatus('Disapproved'));

requestRouter.put('/api/v1/requests/:requestId/resolve',
  UserController.authenticateUser(),
  UserController.authorizeUser(),
  RequestController.updateRequestStatus('Resolved'));
	
export default requestRouter;

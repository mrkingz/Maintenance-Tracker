import express from 'express';
import controllers from '../controllers';

const {
		RequestController,
		UserController,
} = controllers;

const requestRouter = express.Router();

requestRouter.post('/api/v1/users/request',
UserController.authenticateUser(),
  RequestController.createRequest()
);
export default requestRouter;
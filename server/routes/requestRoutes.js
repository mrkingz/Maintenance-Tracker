import express from 'express';
import controllers from '../controllers';

const {
    RequestController
} = controllers;

const requestRouter = express.Router();

requestRouter.post('/api/v1/users/request',
  RequestController.createRequest()
);
export default requestRouter;
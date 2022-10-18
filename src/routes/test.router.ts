import express from 'express';
import TestController from '../controllers/test.controller';

const testRouter = express.Router();

testRouter.get('/', TestController.getTestRequest);

export default testRouter;

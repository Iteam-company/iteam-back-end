import express from 'express';
import EventsController from '../controllers/events.controller';

const loggerRouter = express.Router();

loggerRouter.get('/:projectID', EventsController.getEventsViaQuery);

export default loggerRouter;

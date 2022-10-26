import express from 'express';
import ApplicationsController from '../controllers/applications.controller';

const applicationRouter = express.Router();

applicationRouter.get('/', ApplicationsController.getAllApplications);

applicationRouter.get(
	'/:applicationID',
	ApplicationsController.getApplicationByID
);

applicationRouter.patch(
	'/update/:applicationID',
	ApplicationsController.updateApplicationByID
);

applicationRouter.delete(
	'/delete/:applicationID',
	ApplicationsController.deleteApplicationByID
);

export default applicationRouter;

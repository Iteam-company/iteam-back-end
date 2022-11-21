import auth from '../middlewares/auth.middlewear';
import logger from '../middlewares/logger';
import express from 'express';
import ProjectController from '../controllers/project.controller';

const projectRouter = express.Router();

projectRouter.post('/', ProjectController.createProject);

projectRouter.get('/', ProjectController.getAllProjects);

projectRouter.get('/:projectID', ProjectController.getProjectByID);

projectRouter.patch(
	'/update/:projectID',
	auth,
	logger,
	ProjectController.updateProjectByID
);

projectRouter.delete('/delete/:projectID', ProjectController.deleteProjectByID);

export default projectRouter;

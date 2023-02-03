import auth from '../middlewares/auth.middlewear';
import logger from '../middlewares/logger';
import express from 'express';
import ProjectController from '../controllers/project.controller';

const projectRouter = express.Router();

projectRouter.post('/', auth, ProjectController.createProject);

projectRouter.get('/',auth, ProjectController.getAllProjects);

projectRouter.get('/:projectID',auth, ProjectController.getProjectByID);

projectRouter.patch(
	'/update/:projectID',
	auth,
	logger,
	ProjectController.updateProjectByID
);

projectRouter.delete('/delete/:projectID', ProjectController.deleteProjectByID);

export default projectRouter;

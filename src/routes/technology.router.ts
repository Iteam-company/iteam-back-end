import express from 'express';
import TechnologyController from '../controllers/technology.controller';

const technologyRouter = express.Router();

technologyRouter.post('/', TechnologyController.createTechnology);

technologyRouter.get('/', TechnologyController.getAllTechnologys);

technologyRouter.get('/:technologyID', TechnologyController.getTechnologyByID);

technologyRouter.patch(
	'/update/:technologyID',
	TechnologyController.updateTechnologyByID
);

technologyRouter.delete(
	'/delete/:technologyID',
	TechnologyController.deleteTechnologyByID
);

export default technologyRouter;

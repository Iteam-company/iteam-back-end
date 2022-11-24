import express from 'express';
import SuggestionController from '../controllers/suggestion.controller';

const suggestionRouter = express.Router();

suggestionRouter.post('/', SuggestionController.createSuggestion);

suggestionRouter.get('/', SuggestionController.getAllSuggestions);

suggestionRouter.get('/:suggestionID', SuggestionController.getSuggestionByID);

suggestionRouter.patch(
	'/update/:suggestionID',
	SuggestionController.updateSuggestionByID
);

suggestionRouter.delete(
	'/delete/:suggestionID',
	SuggestionController.deleteSuggestionByID
);

export default suggestionRouter;

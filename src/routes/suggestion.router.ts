import { fileUpload } from '../middlewares/fileUpload.middlewear';
import uploadSuggestionImage from '../middlewares/uploadSuggestionImage.middlewear';
import express from 'express';
import SuggestionController from '../controllers/suggestion.controller';

const suggestionRouter = express.Router();

suggestionRouter.post('/', SuggestionController.createSuggestion);

suggestionRouter.get('/', SuggestionController.getAllSuggestions);

suggestionRouter.get('/:suggestionID', SuggestionController.getSuggestionByID);

suggestionRouter.post(
	'/uploadSuggestionImage/:suggestionID',
	fileUpload.single('uploadSuggestionImage'),
	uploadSuggestionImage,
	SuggestionController.uploadSuggestionImage
);

suggestionRouter.patch(
	'/update/:suggestionID',
	SuggestionController.updateSuggestionByID
);

suggestionRouter.delete(
	'/delete/:suggestionID',
	SuggestionController.deleteSuggestionByID
);

export default suggestionRouter;

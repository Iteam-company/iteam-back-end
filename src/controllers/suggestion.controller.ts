import { Request, Response } from 'express';

import Controller from './index';
import errorsCatcher from '../utils/errorsCatcher';
import SuggestionModel from '../models/suggestion.model';

class SuggestionController extends Controller {
	static async getAllSuggestions(req: Request, res: Response) {
		try {
			const listSuggestions = await SuggestionModel.getAllSuggestions(
				req,
				res
			);

			return res.send(listSuggestions);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createSuggestion(req: Request, res: Response) {
		try {
			const newSuggestions = await SuggestionModel.createSuggestion(
				req,
				res
			);

			return res.send(newSuggestions);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async getSuggestionByID(req: Request, res: Response) {
		try {
			const suggestionByID = await SuggestionModel.getSuggestionByID(
				req,
				res
			);

			return res.send(suggestionByID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async uploadSuggestionImage(req: Request, res: Response) {
		try {
			const uploadedImage = await SuggestionModel.updateSuggestionByID(
				req,
				res
			);

			return res.send(uploadedImage);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async updateSuggestionByID(req: Request, res: Response) {
		try {
			const updatedSuggestion =
				await SuggestionModel.updateSuggestionByID(req, res);

			return res.send(updatedSuggestion);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteSuggestionByID(req: Request, res: Response) {
		try {
			const deletedSuggestion =
				await SuggestionModel.deleteSuggestionByID(req, res);

			return res.send(deletedSuggestion);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default SuggestionController;

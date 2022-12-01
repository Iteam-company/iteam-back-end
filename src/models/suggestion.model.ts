import { Request, Response } from 'express';
import PaginationService from '../services/pagination';

import Model from '.';
import errorsCatcher from '../utils/errorsCatcher';
import SuggestionSchema from './schems/suggestionSchema';

class SuggestionModel extends Model {
	static async getAllSuggestions(req: Request, res: Response) {
		try {
			return await PaginationService.paginationAndSort(
				req,
				SuggestionSchema
			);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createSuggestion(req: Request, res: Response) {
		try {
			const { title, text, variants, comments, isApproved, file, image } =
				req.body;

			const newSuggestion = new SuggestionSchema({
				title,
				text,
				variants,
				comments,
				isApproved,
				file,
				image,
			});

			await newSuggestion.save();

			return newSuggestion;
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 500, 'Wrong data, check and try again');
		}
	}

	static async getSuggestionByID(req: Request, res: Response) {
		const suggestionID = req.params.suggestionID;

		if (!suggestionID) return res.sendStatus(403);

		try {
			return await SuggestionSchema.findById(suggestionID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 404);
		}
	}

	static async updateSuggestionByID(req: Request, res: Response) {
		const suggestionID = req.params.suggestionID;

		if (!suggestionID) return res.sendStatus(403);

		const dataForUpdate = req.body;

		if (!dataForUpdate) return res.sendStatus(200);

		try {
			const updatedSuggestion = await SuggestionSchema.findOneAndUpdate(
				{ _id: suggestionID },
				dataForUpdate
			);

			return { ...updatedSuggestion?.toObject(), ...dataForUpdate };
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteSuggestionByID(req: Request, res: Response) {
		const suggestionID = req.params.suggestionID;

		if (!suggestionID) return res.sendStatus(403);

		try {
			return await SuggestionSchema.findOneAndDelete({
				_id: suggestionID,
			});
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default SuggestionModel;

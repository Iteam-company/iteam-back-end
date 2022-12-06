import { Request, Response } from 'express';

import Model from '.';
import PaginationService from '../services/pagination';
import errorsCatcher from '../utils/errorsCatcher';
import ApplicationSchema from './schems/applicationSchema';

class ApplicationModel extends Model {
	static async getAllApplications(req: Request, res: Response) {
		try {
			return await PaginationService.paginationAndSort(
				req,
				ApplicationSchema
			);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async getApplicationByID(req: Request, res: Response) {
		const applicationID = req.params.applicationID;

		if (!applicationID) return res.sendStatus(403);

		try {
			return await ApplicationSchema.findById(applicationID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 404);
		}
	}

	static async updateApplicationByID(req: Request, res: Response) {
		const applicationID = req.params.applicationID;

		if (!applicationID) return res.sendStatus(403);

		const dataForUpdate = req.body;

		if (!dataForUpdate) return res.sendStatus(200);

		try {
			const updatedApplication = await ApplicationSchema.findOneAndUpdate(
				{ _id: applicationID },
				dataForUpdate
			);

			return { ...updatedApplication?.toObject(), ...dataForUpdate };
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteApplicationByID(req: Request, res: Response) {
		const applicationID = req.params.applicationID;

		if (!applicationID) return res.sendStatus(403);

		try {
			return await ApplicationSchema.findOneAndDelete({
				_id: applicationID,
			});
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default ApplicationModel;

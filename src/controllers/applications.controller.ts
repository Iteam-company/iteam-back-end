import { Request, Response } from 'express';
import ApplicationModel from '../models/application.model';
import errorsCatcher from '../utils/errorsCatcher';
import Controller from '.';

class ApplicationsController extends Controller {
	static async getAllApplications(req: Request, res: Response) {
		try {
			const listApplications = await ApplicationModel.getAllApplications(
				req,
				res
			);

			return res.send(listApplications);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async getApplicationByID(req: Request, res: Response) {
		try {
			const applicationByID = await ApplicationModel.getApplicationByID(
				req,
				res
			);

			return res.send(applicationByID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async updateApplicationByID(req: Request, res: Response) {
		try {
			const updatedApplication =
				await ApplicationModel.updateApplicationByID(req, res);

			return res.send(updatedApplication);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteApplicationByID(req: Request, res: Response) {
		try {
			const deletedApplication =
				await ApplicationModel.deleteApplicationByID(req, res);

			return res.send(deletedApplication);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default ApplicationsController;

import { Request, Response } from 'express';

import Controller from './index';
import errorsCatcher from '../utils/errorsCatcher';
import TechnologyModel from '../models/technology.model';

class TechnologyController extends Controller {
	static async getAllTechnologys(req: Request, res: Response) {
		try {
			const listTechnologys = await TechnologyModel.getAllTechnologys(
				req,
				res
			);

			return res.send(listTechnologys);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createTechnology(req: Request, res: Response) {
		try {
			const newTechnologys = await TechnologyModel.createTechnology(
				req,
				res
			);

			return res.send(newTechnologys);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async getTechnologyByID(req: Request, res: Response) {
		try {
			const userByID = await TechnologyModel.getTechnologyByID(req, res);

			return res.send(userByID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async updateTechnologyByID(req: Request, res: Response) {
		try {
			const updatedTechnology =
				await TechnologyModel.updateTechnologyByID(req, res);

			return res.send(updatedTechnology);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteTechnologyByID(req: Request, res: Response) {
		try {
			const deletedTechnology =
				await TechnologyModel.deleteTechnologyByID(req, res);

			return res.send(deletedTechnology);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default TechnologyController;

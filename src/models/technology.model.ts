import { Request, Response } from 'express';

import Model from '.';
import errorsCatcher from '../utils/errorsCatcher';
import TechnologySchema from './schems/technologySchema';

class TechnologyModel extends Model {
	static async getAllTechnologys(req: Request, res: Response) {
		try {
			return await TechnologySchema.find({});
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createTechnology(req: Request, res: Response) {
		try {
			const { title, ico } = req.body;

			const newTechnology = new TechnologySchema({
				title,
				ico,
			});

			await newTechnology.save();

			return newTechnology;
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 500, 'Wrong data, check and try again');
		}
	}

	static async getTechnologyByID(req: Request, res: Response) {
		const technologyID = req.params.technologyID;

		if (!technologyID) return res.sendStatus(403);

		try {
			return await TechnologySchema.findById(technologyID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 404);
		}
	}

	static async updateTechnologyByID(req: Request, res: Response) {
		const technologyID = req.params.technologyID;

		if (!technologyID) return res.sendStatus(403);

		const dataForUpdate = req.body;

		if (!dataForUpdate) return res.sendStatus(200);

		try {
			const updatedTechnology = await TechnologySchema.findOneAndUpdate(
				{ _id: technologyID },
				dataForUpdate
			);

			return { ...updatedTechnology?.toObject(), ...dataForUpdate };
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteTechnologyByID(req: Request, res: Response) {
		const technologyID = req.params.technologyID;

		if (!technologyID) return res.sendStatus(403);

		try {
			return await TechnologySchema.findOneAndDelete({
				_id: technologyID,
			});
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default TechnologyModel;

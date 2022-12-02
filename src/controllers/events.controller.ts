import { Request, Response } from 'express';
import LoggerService from '../services/logger';
import errorsCatcher from '../utils/errorsCatcher';
import Controller from '.';
import EventModel from '../models/event.model';

class EventsController extends Controller {
	static async getEventsViaQuery(req: Request, res: Response) {
		try {
			return await EventModel.getAllEvents(req, res);

			// if (project) {
			// 	const logs = await LoggerService.getLogsByProjectID(
			// 		project as string
			// 	);

			// 	return res.status(200).send(logs);
			// }

			// if (user) {
			// 	const logs = await LoggerService.getLogsByUserID(
			// 		user as string
			// 	);

			// 	return res.status(200).send(logs);
			// }

			// if (log) {
			// 	const logById = await LoggerService.getLogByID(log as string);

			// 	return res.status(200).send(logById);
			// }

			// return res.status(404).send({ msg: 'One of params required' });
		} catch (e) {
			errorsCatcher(res);
			console.error(e);
		}
	}
}

export default EventsController;

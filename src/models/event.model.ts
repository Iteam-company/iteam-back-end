import { Request, Response } from 'express';
import LoggerService from '../services/logger';

import Model from '.';
import errorsCatcher from '../utils/errorsCatcher';
import EventSchema from './schems/eventSchema';

class EventModel extends Model {
	static async getAllEvents(req: Request, res: Response) {
		try {
			const { _id, projectID, userID } = req.body;

			if (_id) {
				return await LoggerService.getLogsBy(req, { _id });
			}

			if (projectID) {
				return await LoggerService.getLogsBy(req, {
					project: projectID,
				});
			}

			if (userID) {
				return await LoggerService.getLogsBy(req, { user: userID });
			}

			// in case if nothing passed
			return res.status(400);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createEvent(req: Request, res: Response) {
		try {
			const {
				name,
				iconUrl,
				mainDevID,
				subDevsID,
				history,
				technologies,
				startTime,
				endTime,
				status,
			} = req.body;

			const newEvent = new EventSchema({
				name,
				iconUrl,
				mainDevID,
				subDevsID,
				history,
				technologies,
				startTime,
				endTime,
				status,
			});

			await newEvent.save();

			return newEvent;
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 500, 'Wrong data, check and try again');
		}
	}

	static async getEventByID(req: Request, res: Response) {
		const projectID = req.params.projectID;

		if (!projectID) return res.sendStatus(403);

		try {
			return await EventSchema.findById({ _id: projectID });
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 404);
		}
	}
}

export default EventModel;

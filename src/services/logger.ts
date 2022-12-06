import { Request } from 'express';

import Service from '.';
import EventInterface from '../models/interfaces/event.interface';
import Event from '../models/schems/eventSchema';
import PaginationService from './pagination';
class LoggerService extends Service {
	static async createLog(event: EventInterface) {
		try {
			return await Event.create(event);
		} catch (e) {
			console.error(e);
		}
	}

	static async getLogsBy(req: Request, params: object) {
		try {
			return await PaginationService.paginationAndSort(
				req,
				Event,
				params
			);
		} catch (e) {
			console.error(e);
		}
	}
}

export default LoggerService;

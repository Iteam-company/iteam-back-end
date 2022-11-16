import EventInterface from '../models/interfaces/event.interface';
import Event from '../models/schems/eventSchema';

export enum LoggerActions {
	userAssignedToProject = 'USER_ASIGNED_TO_PROJECT',
	userLeavedProject = 'USER_LEAVED_PROJECT',
	userBecomesMainProjectDev = 'USER_BECOMES_MAIN_PROJECT_DEV',
	userBecomesOrdinaryProjectDev = 'USER_BECOMES_ORDINARY_PROJECT_DEV',
}

class LoggerService {
	static async createLog(event: EventInterface) {
		try {
			return await Event.create(event);
		} catch (e) {
			console.error(e);
		}
	}
	static async getLogByID(_id: string) {
		try {
			return await Event.findById(_id);
		} catch (e) {
			console.error(e);
		}
	}
	static async getLogsByProjectID(projectID: string) {
		try {
			return await Event.find({ project: projectID });
		} catch (e) {
			console.error(e);
		}
	}
	static async getLogsByUserID(userID: string) {
		try {
			return await Event.find({ user: userID });
		} catch (e) {
			console.error(e);
		}
	}
}

export default LoggerService;

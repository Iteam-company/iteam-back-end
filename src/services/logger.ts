import EventInterface from '../models/interfaces/event.interface';
import Event from '../models/schems/eventSchema';
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

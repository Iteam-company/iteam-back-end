import { Document, ObjectId } from 'mongodb';

export enum LoggerActions {
	userAssignedToProject = 'USER_ASIGNED_TO_PROJECT',
	userLeavedProject = 'USER_LEAVED_PROJECT',
	userBecomesMainProjectDev = 'USER_BECOMES_MAIN_PROJECT_DEV',
	userBecomesOrdinaryProjectDev = 'USER_BECOMES_ORDINARY_PROJECT_DEV',
}
interface EventInterface extends Document {
	action: LoggerActions;
	date: string;
	user?: ObjectId;
	project?: ObjectId;
	actionPerformer: ObjectId;
	createdAt?: string;
}

export default EventInterface;

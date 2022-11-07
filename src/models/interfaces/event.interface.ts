import { ObjectId } from 'mongodb';

interface EventInterface {
	action: string;
	date: string;
	user?: ObjectId;
	project?: ObjectId;
	actionPerformer: ObjectId;
	createdAt?: string;
}

export default EventInterface;

import { Document, ObjectId } from 'mongodb';

interface ApplicationInterface extends Document {
	_id: ObjectId;
	email: string;
	fullName: string;
	date: Date;
	isApproved: boolean;
}

export default ApplicationInterface;

import { ObjectId } from 'mongoose';

interface ApplicationInterface {
	_id: ObjectId;
	email: string;
	fullName: string;
	date: Date;
	isApproved: boolean;
}

export default ApplicationInterface;

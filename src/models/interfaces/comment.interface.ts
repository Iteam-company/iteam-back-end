import { Document, ObjectId } from 'mongodb';

export interface CommentsInterface extends Document {
	_id?: ObjectId;
	text: string;
	userID: ObjectId;
	authorID: ObjectId;
	date?: string;
}

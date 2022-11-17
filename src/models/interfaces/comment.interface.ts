import { ObjectId } from 'mongodb';

export interface CommentsInterface {
	_id?: ObjectId;
	text: string;
	userID: ObjectId;
	authorID: ObjectId;
	date?: string;
}

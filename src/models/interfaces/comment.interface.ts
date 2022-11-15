import { ObjectId } from 'mongodb';

export interface CommentsInterface {
	text: string;
	userID: ObjectId;
	authorID: ObjectId;
	date: string;
}

import { ObjectId } from 'mongodb';

export interface CandidateInterface {
	email?: string;
	name?: string;
	surname?: string;
	site?: string;
	phone?: string;
	expirienceInIt?: string;
	english?: string;
	addres?: string;
	salary?: string;
	dateInterview?: string;
	cvLink?: string;
	cvFile?: string;
	status?: string;
}

export interface CommentsInterface {
	text: string;
	userID: ObjectId;
	authorID: ObjectId;
	date: string;
}

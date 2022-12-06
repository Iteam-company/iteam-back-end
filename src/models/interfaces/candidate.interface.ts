import { Document, ObjectId } from 'mongodb';

export interface CandidateInterface extends Document {
	_id?: ObjectId;
	surname: string;
	name: string;
	email: string;
	phone: string;
	site?: string;
	expirienceInIt?: string;
	english?: string;
	addres?: string;
	salary?: string;
	dateInterview?: string;
	cvLink?: string;
	cvFile?: string;
	status?: string;
}

export interface ExelCandidateInterface extends Document {
	Status: string;
	Number: string;
	FullName: string;
	Site: string;
	Email: string;
	Phone: string;
	Experience: string;
	English: string;
	Address: string;
	Salary: string;
	'Date interview': string;
	CV: string;
	comments: string;
}

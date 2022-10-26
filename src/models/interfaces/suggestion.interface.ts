import { ObjectId } from 'mongoose';

interface SuggestionInterface {
	title: string;
	text?: string;
	variants?: [{ text: string; usersApproved: [ObjectId] }];
	comments?: [{ user: ObjectId; text: string }];
	isApproved: boolean;
	file: string;
	image: string;
}

export default SuggestionInterface;

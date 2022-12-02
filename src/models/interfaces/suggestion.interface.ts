import { Document, ObjectId } from 'mongodb';

interface SuggestionInterface extends Document {
	_id: ObjectId;
	title: string;
	text?: string;
	variants: [{ text: string; usersApproved: ObjectId[] }];
	comments?: [{ user: ObjectId; text: string }];
	isApproved: boolean;
	file?: string;
	image?: string;
}

export default SuggestionInterface;

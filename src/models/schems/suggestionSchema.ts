import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

import SuggestionInterface from '../interfaces/suggestion.interface';

const SuggestionSchema = new Schema<SuggestionInterface>({
	title: { type: String, required: true },
	text: { type: String },
	variants: [
		{
			type: { text: String, usersApproved: [{ type: ObjectId }] },
			required: true,
		},
	],
	comments: { type: { user: ObjectId, text: String } },
	isApproved: { type: Boolean, default: false, required: true },
	file: { type: String },
	image: { type: String },
});

const Suggestion = model('suggestions', SuggestionSchema);

export default Suggestion;

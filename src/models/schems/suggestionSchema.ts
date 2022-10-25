import { Schema, model } from 'mongoose';

import SuggestionInterface from '../interfaces/suggestion.interface';

const suggestion = new Schema<SuggestionInterface>({
	title: { type: String, required: true },
	text: { type: String },
	variants: { type: Array, required: true, default: [] },
	comments: { type: Array },
	isApproved: { type: Boolean, default: false, required: true },
	file: { type: String },
	image: { type: String },
});

export default model('suggestions', suggestion);

import { Schema, model } from 'mongoose';
import { CandidateInterface } from '../interfaces/candidate.interface';

const CandateSchema = new Schema<CandidateInterface>({
	email: {
		type: String,
		required: false,
		unique: true,
		trim: true,
		lowercase: true,
	},
	name: { type: String, required: false },
	surname: { type: String, required: false },
	site: { type: String, required: false },
	phone: { type: String, required: false },
	expirienceInIt: { type: String, required: false },
	english: { type: String, required: false },
	addres: { type: String, required: false },
	salary: { type: String, required: false },
	dateInterview: { type: String, required: false },
	cvLink: { type: String, required: false },
	cvFile: { type: String, required: false },
	status: { type: String },
	comments: { type: Array, default: [] },
});

const Candidates = model('candidates', CandateSchema);

export default Candidates;

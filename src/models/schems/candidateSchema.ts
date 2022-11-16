import { Schema, model } from 'mongoose';
import { CandidateInterface } from '../interfaces/candidate.interface';

const CandateSchema = new Schema<CandidateInterface>({
	surname: { type: String, required: false },
	name: { type: String, required: true },
	site: { type: String, required: false },
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	phone: { type: String, required: true },
	expirienceInIt: { type: String, required: false },
	english: { type: String, required: false },
	addres: { type: String, required: false },
	salary: { type: String, required: false },
	dateInterview: { type: String, required: false },
	cvLink: { type: String, required: false },
	cvFile: { type: String, required: false },
	status: { type: String, required: false },
});

const Candidates = model('candidates', CandateSchema);

export default Candidates;

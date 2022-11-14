import { Schema, model } from 'mongoose';
import { CandidateInterface } from '../interfaces/candidate.interface';

const CandateSchema = new Schema<CandidateInterface>({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	name: { type: String, required: true },
	surname: { type: String, required: true },
	phone: { type: String, required: true },
	site: { type: String, required: false },
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

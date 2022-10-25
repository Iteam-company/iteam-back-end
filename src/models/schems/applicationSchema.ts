import { Schema, model } from 'mongoose';
import ApplicationInterface from '../interfaces/application.interface';

const application = new Schema<ApplicationInterface>({
	email: { type: String, required: true },
	fullName: { type: String, required: true },
	date: { type: Date, required: true },
	isApproved: { type: Boolean, default: false },
});

const Application = model('applications', application);

export default Application;

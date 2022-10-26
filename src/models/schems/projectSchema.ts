import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import ProjectInterface from '../interfaces/project.interface';
import { Statuses } from '../interfaces/user.interface';

const project = new Schema<ProjectInterface>({
	name: { type: String, required: true },
	iconUrl: { type: String, default: '/img/default.webp' },
	mainDevID: { type: ObjectId, ref: 'Users' },

	subDevsID: { type: Array },
	history: { type: Array },
	technologies: { type: Array },
	startTime: { type: Date, default: Date.now() },
	endTime: { type: Date },
	status: {
		type: String,
		enum: [Statuses.ACTIVE, Statuses.INACTIVE],
		default: Statuses.ACTIVE,
	},
});

export default model('projects', project);

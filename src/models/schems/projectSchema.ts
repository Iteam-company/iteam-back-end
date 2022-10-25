import { Schema, model } from 'mongoose';

const project = new Schema({
	name: { type: String, required: true },
	iconUrl: { type: String, default: '/img/default.webp' },
	mainDevID: { type: String },
	subDevsID: { type: Array },
	history: { type: Array },
	technologies: { type: Array },
	startTime: { type: Date, default: Date.now() },
	endTime: { type: Date },
	status: {
		type: String,
		enum: ['ACTIVE', 'INACTIVE'],
		default: 'ACTIVE',
	},
});

export default model('projects', project);

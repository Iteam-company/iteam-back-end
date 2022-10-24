import { Schema, model } from 'mongoose';

const user = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: { type: String, min: 8 },
	name: { type: String, required: true },
	surname: { type: String, required: true },
	role: {
		type: String,
		enum: ['ADMIN', 'HR', 'RECRUTIER', 'DEV', 'INTERN'],
		default: 'DEV',
	},
	workType: {
		type: String,
		enum: ['REMOUTE', 'OFFICE', 'MIX'],
		default: 'OFFICE',
	},
	avatarUrl: { type: String, default: '/img/default.webp' },
	file: { type: String },
	phone: { type: String },
	offerDay: { type: Date, default: Date.now() },
	birthday: { type: String },
	expirience: { type: String },
	skills: { type: String },
	stack: { type: Array },
	addres: { type: String },
	city: { type: Number },
	team: { type: Array, default: [] },
	company: { type: Number },
	salary: { type: Number, default: 0 },
	tokens: { type: Object },
	links: { type: Array },
	status: {
		type: String,
		enum: ['ACTIVE', 'INACTIVE'],
		default: 'ACTIVE',
	},
});

export default model('users', user);

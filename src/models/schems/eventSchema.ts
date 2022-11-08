import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import EventInterface from '../interfaces/event.interface';

const EventSchema = new Schema<EventInterface>(
	{
		action: { type: String },
		date: { typre: String },
		project: { type: ObjectId, ref: 'projects', required: false },
		actionPerformer: { type: ObjectId, ref: 'users' },
		user: { type: ObjectId, ref: 'users', required: false },
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);
Promise;

const Event = model('technologys', EventSchema);

export default Event;

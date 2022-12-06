import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import EventInterface, { LoggerActions } from '../interfaces/event.interface';

const EventSchema = new Schema<EventInterface>(
	{
		action: {
			type: String,
			enum: Object.values(LoggerActions),
		},
		date: { typre: String },
		project: { type: ObjectId, ref: 'Projects', required: false },
		actionPerformer: { type: ObjectId, ref: 'Users' },
		user: { type: ObjectId, ref: 'Users', required: false },
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const Event = model('events', EventSchema);

export default Event;

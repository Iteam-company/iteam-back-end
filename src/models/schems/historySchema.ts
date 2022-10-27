import { Schema, model } from 'mongoose';

const HistorySchema = new Schema({
	who: { type: String, required: true },
	when: { type: Date, default: Date.now() },
	what: { type: String },
});

const History = model('historys', HistorySchema);

export default History;

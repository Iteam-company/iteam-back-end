import { Schema, model } from 'mongoose';

const history = new Schema({
	who: { type: String, required: true },
	when: { type: Date, default: Date.now() },
	what: { type: String },
});

export default model('historys', history);

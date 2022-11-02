import { Schema, model } from 'mongoose';

import TechnologyInterface from '../interfaces/technology.interface';

const TechnologySchema = new Schema<TechnologyInterface>({
	title: { type: String, required: true },
	ico: { type: String, required: false },
});

const Technology = model('technologys', TechnologySchema);

export default Technology;

import { Document, ObjectId } from 'mongodb';

interface TechnologyInterface extends Document {
	_id: ObjectId;
	title: string;
	ico: string;
}

export default TechnologyInterface;

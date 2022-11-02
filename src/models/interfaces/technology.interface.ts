import { ObjectId } from 'mongoose';

interface TechnologyInterface {
	_id: ObjectId;
	title: string;
	ico: string;
}

export default TechnologyInterface;

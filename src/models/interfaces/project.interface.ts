import { Document, ObjectId } from 'mongodb';

interface ProjectInterface extends Document {
	name: string;
	iconUrl?: string;
	mainDevID?: string;
	subDevsID?: ObjectId[];
	history?: [];
	technologies?: ObjectId[];
	startTime: Date;
	endTime?: Date;
	status: string;
}

export default ProjectInterface;

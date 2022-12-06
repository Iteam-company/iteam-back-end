import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { CommentsInterface } from '../interfaces/comment.interface';

const CommentSchema = new Schema<CommentsInterface>({
	text: { type: String, required: false },
	userID: { type: ObjectId, ref: 'Users' },
	authorID: { type: ObjectId, ref: 'Users' },
	date: { type: String, default: Date() },
});

const Comments = model('comments', CommentSchema);

export default Comments;

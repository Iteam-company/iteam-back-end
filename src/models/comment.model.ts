import { Request, Response } from 'express';

import Model from '.';
import PaginationService from '../services/pagination';
import errorsCatcher from '../utils/errorsCatcher';
import CommentSchema from './schems/commentSchema';

class CommentModel extends Model {
	static async getAllComments(req: Request, res: Response) {
		try {
			return await PaginationService.paginationAndSort(
				req,
				CommentSchema
			);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createComment(req: Request, res: Response) {
		try {
			const { text, userID, authorID } = req.body;

			const newComment = new CommentSchema({
				text,
				userID,
				authorID,
			});

			await newComment.save();

			return newComment;
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 500, 'Wrong data, check and try again');
		}
	}

	static async getCommentByID(req: Request, res: Response) {
		const commentID = req.params.commentID;

		if (!commentID) return res.sendStatus(403);

		try {
			return await CommentSchema.findById(commentID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 404);
		}
	}

	static async updateCommentByID(req: Request, res: Response) {
		const commentID = req.params.commentID;

		if (!commentID) return res.sendStatus(403);

		const dataForUpdate = req.body;

		if (!dataForUpdate) return res.sendStatus(200);

		try {
			const updatedComment = await CommentSchema.findOneAndUpdate(
				{ _id: commentID },
				dataForUpdate
			);

			return { ...updatedComment?.toObject(), ...dataForUpdate };
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteCommentByID(req: Request, res: Response) {
		const commentID = req.params.commentID;

		if (!commentID) return res.sendStatus(403);

		try {
			return await CommentSchema.findOneAndDelete({
				_id: commentID,
			});
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default CommentModel;

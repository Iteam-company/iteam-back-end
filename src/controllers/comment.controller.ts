import { Request, Response } from 'express';

import Controller from './index';
import errorsCatcher from '../utils/errorsCatcher';
import CommentModel from '../models/comment.model';

class CommentController extends Controller {
	static async getAllComments(req: Request, res: Response) {
		try {
			const listComments = await CommentModel.getAllComments(req, res);

			return res.send(listComments);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createComment(req: Request, res: Response) {
		try {
			const newComments = await CommentModel.createComment(req, res);

			return res.send(newComments);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async getCommentByID(req: Request, res: Response) {
		try {
			const userByID = await CommentModel.getCommentByID(req, res);

			return res.send(userByID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async updateCommentByID(req: Request, res: Response) {
		try {
			const updatedComment = await CommentModel.updateCommentByID(
				req,
				res
			);

			return res.send(updatedComment);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteCommentByID(req: Request, res: Response) {
		try {
			const deletedComment = await CommentModel.deleteCommentByID(
				req,
				res
			);

			return res.send(deletedComment);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default CommentController;

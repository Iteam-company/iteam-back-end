import express from 'express';
import CommentController from '../controllers/comment.controller';

const commentRouter = express.Router();

commentRouter.post('/', CommentController.createComment);

commentRouter.get('/', CommentController.getAllComments);

commentRouter.get('/:commentID', CommentController.getCommentByID);

commentRouter.patch('/update/:commentID', CommentController.updateCommentByID);

commentRouter.delete('/delete/:commentID', CommentController.deleteCommentByID);

export default commentRouter;

import { fileUpload } from '../middlewares/fileUpload.middlewear';
import express from 'express';

import UserController from '../controllers/user.controller';
import uploadAvatar from '../middlewares/uploadAvatar.middlewear';

const userRouter = express.Router();

userRouter.post('/', UserController.createUser);

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userID', UserController.getUserByID);

userRouter.post(
	'/uploadAvatar/:userID',
	fileUpload.single('uploadAvatar'),
	uploadAvatar,
	UserController.uploadUserAvatar
);

userRouter.patch('/update/:userID', UserController.updateUserByID);

userRouter.delete('/delete/:userID', UserController.deleteUserByID);

export default userRouter;

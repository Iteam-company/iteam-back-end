import express from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/', UserController.createUser);

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:userID', UserController.getUserByID);

userRouter.patch('/update/:userID', UserController.updateUserByID);

userRouter.delete('/delete/:userID', UserController.deleteUserByID);

export default userRouter;

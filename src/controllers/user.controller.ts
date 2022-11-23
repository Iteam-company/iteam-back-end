import { Request, Response } from 'express';

import Controller from './index';
import errorsCatcher from '../utils/errorsCatcher';
import UserModel from '../models/user.model';

class UserController extends Controller {
	static async getAllUsers(req: Request, res: Response) {
		try {
			const listUsers = await UserModel.getAllUsers(req, res);

			return res.send(listUsers);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createUser(req: Request, res: Response) {
		try {
			const newUsers = await UserModel.createUser(req, res);

			return res.send(newUsers);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async getUserByID(req: Request, res: Response) {
		try {
			const userByID = await UserModel.getUserByID(req, res);
			console.log(123);

			return res.send(userByID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async uploadUserAvatar(req: Request, res: Response) {
		try {
			const uploadedAvatar = await UserModel.updateUserByID(req, res);

			return res.send(uploadedAvatar);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async updateUserByID(req: Request, res: Response) {
		try {
			const updatedUser = await UserModel.updateUserByID(req, res);

			return res.send(updatedUser);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteUserByID(req: Request, res: Response) {
		try {
			const deletedUser = await UserModel.deleteUserByID(req, res);

			return res.send(deletedUser);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default UserController;

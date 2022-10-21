import { Request, Response } from 'express';

import Model from '.';
import errorsCatcher from '../utils/errorsCatcher';
import userSchema from './schems/userSchema';

class UserModel extends Model {
	static async getAllUsers(req: Request, res: Response) {
		try {
			return await userSchema.find({});
		} catch (e) {
			console.error(e);
			errorsCatcher(res);
		}
	}

	static async createUser(req: Request, res: Response) {
		try {
			const { email, password, name, surname } = req.body;

			const newUser = new userSchema({
				email,
				password,
				name,
				surname,
			});

			await newUser.save();

			return newUser;
		} catch (e) {
			console.error(e);
			errorsCatcher(res, 500, 'Wrong data, check and try again');
		}
	}

	static async getUserByID(req: Request, res: Response) {
		const userID = req.params.userID;

		if (!userID) return res.sendStatus(403);

		try {
			return await userSchema.findById({ _id: userID });
		} catch (e) {
			console.error(e);
			errorsCatcher(res, 404);
		}
	}

	static async updateUserByID(req: Request, res: Response) {
		const userID = req.params.userID;

		if (!userID) return res.sendStatus(403);

		const dataForUpdate = req.body;

		if (!dataForUpdate) return res.sendStatus(200);

		try {
			const updatedUser = await userSchema.findOneAndUpdate(
				{ _id: userID },
				dataForUpdate
			);

			return { ...updatedUser?.toObject(), ...dataForUpdate };
		} catch (e) {
			console.error(e);
			errorsCatcher(res);
		}
	}

	static async deleteUserByID(req: Request, res: Response) {
		const userID = req.params.userID;

		if (!userID) return res.sendStatus(403);

		try {
			return await userSchema.findOneAndDelete({ _id: userID });
		} catch (e) {
			console.error(e);
			errorsCatcher(res);
		}
	}
}

export default UserModel;

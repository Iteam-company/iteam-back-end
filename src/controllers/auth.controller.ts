import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userSchema from '../models/schems/userSchema';
import errorsCatcher from '../utils/errorsCatcher';
import Controller from './index';

class AuthController extends Controller {
	static async signUp(req: Request, res: Response) {
		try {
			const user = new userSchema(req.body);
			await user.generateRefreshToken();
			await user.generateAccessToken();
			await user.hashPassword();

			await user.save();

			res.status(200).send(user.removePassword());
		} catch (e) {
			console.log(e, 'ERROR');
			errorsCatcher(res);
		}
	}

	static async signIn(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const user = await userSchema.findOne({ email });

			if (!user) return res.sendStatus(404);

			const isPasswordsMatching = await bcrypt.compare(
				password,
				user.password as string
			);

			if (!isPasswordsMatching) return res.sendStatus(404);

			await user.generateAccessToken();
			await user.generateRefreshToken();

			return res.status(200).send(user.removePassword());
		} catch (e) {
			errorsCatcher(res);
		}
	}

	static async getTestRequest(req: Request, res: Response) {
		try {
			res.send({ message: 'Test message' });
		} catch (e) {
			errorsCatcher(res);
		}
	}
}

export default AuthController;

import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userSchema from '../models/schems/userSchema';
import errorsCatcher from '../utils/errorsCatcher';
import Controller from './index';
import { JWT_REFRESH_SECRET_KEY } from '../../env';

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

	static async regenerateTokens(req: Request, res: Response) {
		try {
			const { refreshToken } = req.body;
			const data = jwt.verify(
				refreshToken as string,
				JWT_REFRESH_SECRET_KEY as string
			) as JwtPayload;

			if (!data._id) return res.sendStatus(404);

			const user = await userSchema.findById(data._id);

			if (user) {
				const accessToken = await user.generateAccessToken();
				const refreshToken = await user.generateRefreshToken();

				res.status(200).send({ accessToken, refreshToken });
			} else {
				res.sendStatus(404);
			}
		} catch (e) {
			console.log(e, 'ERROR');
			errorsCatcher(res);
		}
	}
}

export default AuthController;

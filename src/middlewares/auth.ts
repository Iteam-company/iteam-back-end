import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserInterface from 'src/models/interfaces/user.interface';
import User from '../models/user.model';

const auth = async (
	req: Request & { user?: UserInterface },
	res: Response,
	next: NextFunction
) => {
	const accessToken = req.get('AccessToken');
	// const refreshToken = req.get('RefreshToken');

	try {
		const data = jwt.verify(accessToken as string, 'secret') as JwtPayload;
		const user = await User.getUserByID(data._id, res);

		if (user) {
			req.user = user as UserInterface;
			return next();
		}
	} catch (err) {
		res.sendStatus(401);
		console.log(err, 'err');
	}
};

export default auth;

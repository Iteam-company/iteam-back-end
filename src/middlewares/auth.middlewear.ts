import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserInterface from '../models/interfaces/user.interface';
import Application from '../models/schems/applicationSchema';
import userSchema from '../models/schems/userSchema';

const auth = async (
	req: Request & { user?: UserInterface },
	res: Response,
	next: NextFunction
) => {
	const accessToken = req.get('AccessToken');

	try {
		const data = jwt.verify(accessToken as string, 'secret') as JwtPayload;
		const user = await userSchema.findById(data._id);

		if (user) {
			req.user = user as UserInterface;

			//checking that user allowed to pass
			const application = await Application.findOne({
				email: user.email,
			});

			if (application && application.isApproved) {
				return next();
			} else {
				return res.status(401);
			}
		}
	} catch (err) {
		res.sendStatus(401);
		console.log(err, 'err');
	}
};

export default auth;

import { NextFunction, Request, Response } from 'express';
import FileEvents from '../services/fileEvents';
import CloudinaryService from '../services/cloudinary';

const uploadAvatar = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.file) return res.sendStatus(401);

	const pathFile = `./public/uploadsFiles/${req?.file?.originalname}`;
	try {
		const uploaded = await CloudinaryService.uploadBinary(
			pathFile,
			req?.file.filename,
			`/Iteam/users/${req.params.userID}`
		);

		FileEvents.deleteFileByPath(pathFile);

		if (!('url' in uploaded)) return res.sendStatus(401);

		req.body.avatarUrl = uploaded.url;

		return next();
	} catch (err) {
		res.sendStatus(401);
		console.error(err, 'err');
	}
};

export default uploadAvatar;

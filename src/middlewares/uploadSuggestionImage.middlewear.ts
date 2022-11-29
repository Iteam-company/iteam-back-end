import { NextFunction, Request, Response } from 'express';
import FileEvents from '../services/fileEvents';
import CloudinaryService from '../services/cloudinary';

const uploadSuggestionImage = async (
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
			`/Iteam/suggestions/${req.params.suggestionID}`
		);

		FileEvents.deleteFileByPath(pathFile);

		if (!('url' in uploaded)) return res.sendStatus(401);

		req.body.image = uploaded.url;

		return next();
	} catch (err) {
		res.sendStatus(401);
		console.error(err, 'err');
	}
};

export default uploadSuggestionImage;

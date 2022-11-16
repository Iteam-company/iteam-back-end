import e, { NextFunction, Request, Response } from 'express';
import { CandidateInterface } from '../models/interfaces/candidate.interface';

import FileEvents from '../services/fileEvents';

const importFromExelCandidates = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const linkToFile = `./public/uploadsFiles/${req?.file?.originalname}`;

	try {
		const candidateInJSON: [] | null =
			await FileEvents.candidatesFormExelToJson(linkToFile);

		if (!candidateInJSON || candidateInJSON.length < 1) res.sendStatus(401);

		const formatedcandidateInJson: CandidateInterface[] =
			FileEvents.formatingCandidateInJson(candidateInJSON);

		const insertedData = await FileEvents.insertCandidateToDB(
			formatedcandidateInJson
		);

		// deleting files "xmls,json"
		FileEvents.deleteFileByPath(linkToFile);
		FileEvents.deleteFileByPath(linkToFile.replace('xlsx', 'json'));

		if (insertedData) {
			console.log('Inserted!!!');
			return res.send(insertedData).status(201);
		}
	} catch (err) {
		res.sendStatus(401);
		console.error(err, 'err');
	}
};

export default importFromExelCandidates;

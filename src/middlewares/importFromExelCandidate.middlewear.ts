import e, { NextFunction, Request, Response } from 'express';
import { CandidateInterface } from '../models/interfaces/candidate.interface';

import ImportFiles from '../services/ImportFiles';

import fs from 'fs';
const importFromExelCandidates = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const linkToFile = `./public/uploadsFiles/${req?.file?.originalname}`;

	try {
		const candidateInJSON: [] | null =
			await ImportFiles.candidatesFormExelToJson(linkToFile);

		if (!candidateInJSON || candidateInJSON.length < 1) res.sendStatus(401);

		const formatedcandidateInJson: CandidateInterface[] =
			ImportFiles.formatingCandidateInJson(candidateInJSON);

		const insertedData = await ImportFiles.insertCandidateToDB(
			formatedcandidateInJson
		);

		// deleting files "xmls,json"
		fs.unlink(linkToFile, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('File deleted from: --> ', linkToFile);
			}
		});

		fs.unlink(linkToFile.replace('xlsx', 'json'), (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(
					'File deleted from: --> ',
					linkToFile.replace('xlsx', 'json')
				);
			}
		});

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

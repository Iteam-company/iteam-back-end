import { Request, Response } from 'express';

import FileEvents from '../services/fileEvents';
import { CommentsInterface } from '../models/interfaces/comment.interface';
import {
	CandidateInterface,
	ExelCandidateInterface,
} from '../models/interfaces/candidate.interface';
import FirebaseService from '../services/firebase';

const importFromExelCandidates = async (req: Request, res: Response) => {
	if (!req.file) return res.sendStatus(401);

	const linkToFile = `./public/uploadsFiles/${req?.file?.originalname}`;

	try {
		const candidateInJSON: ExelCandidateInterface[] | null =
			await FileEvents.candidatesFormExelToJson(linkToFile);

		if (!candidateInJSON || candidateInJSON.length < 1) res.sendStatus(401);

		const formatedcandidateInJson: CandidateInterface[] =
			FileEvents.formatingCandidateInJson(candidateInJSON);

		const insertedCandidates = await FileEvents.insertCandidateToDB(
			formatedcandidateInJson
		);

		if (insertedCandidates && Array.isArray(insertedCandidates)) {
			const formatedCommentsInJson: CommentsInterface[] =
				FileEvents.formatingCommentsInJson(
					insertedCandidates,
					candidateInJSON
				);

			FileEvents.insertCommentsToDB(formatedCommentsInJson);

			console.log('Inserted!!!');
		}

		await FirebaseService.uploadFile(req.file.path);

		// deleting files "xmls,json"
		FileEvents.deleteFileByPath(linkToFile);
		FileEvents.deleteFileByPath(linkToFile.replace('xlsx', 'json'));

		return res.send(insertedCandidates).status(201);
	} catch (err) {
		res.sendStatus(401);
		console.error(err, 'err');
	}
};

export default importFromExelCandidates;

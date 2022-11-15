import { NextFunction, Request, Response } from 'express';
import { CandidateInterface } from 'src/models/interfaces/candidate.interface';

import ImportFiles from '../services/ImportFiles';

const importFromExelCandidates = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const candidateInJSON: [] | null =
			await ImportFiles.candidatesFormExelToJson(
				'./public/uploadsFiles/' + req?.file?.originalname
			);
		///////?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// if (!candidateInJSON || candidateInJSON.length < 1)
		// 	return res.status(400);

		// const formatedcandidateInJson: CandidateInterface[] | null =
		// 	await ImportFiles.formatingcandidateInJson(candidateInJSON);

		// const res = await ImportFiles.insertCandidateToDB(
		// 	formatedcandidateInJson
		// );
		// console.log(res);

		// 	if (application && application.isApproved) {
		// 		return next();
		// 	} else {
		// 		return res.status(401);
		// 	}
		// }
	} catch (err) {
		res.sendStatus(401);
		console.error(err, 'err');
	}
};

export default importFromExelCandidates;

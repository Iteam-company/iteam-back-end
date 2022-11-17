import express from 'express';
import checkDuplicateCandidate from '../middlewares/checkDuplicateCandidate.middlewear';
import CandidateController from '../controllers/candidate.controller';

import { fileUpload } from '../middlewares/fileUpload.middlewear';
import importFromExelCandidates from '../middlewares/importFromExelCandidate.middlewear';

const candidateRouter = express.Router();

candidateRouter.post(
	'/',
	checkDuplicateCandidate,
	CandidateController.createCandidate
);

candidateRouter.get('/', CandidateController.getAllCandidates);

candidateRouter.get('/:candidateID', CandidateController.getCandidateByID);

candidateRouter.patch(
	'/update/:candidateID',
	CandidateController.updateCandidateByID
);

candidateRouter.post(
	'/uploadExcelFile',
	fileUpload.single('uploadExelFile'),
	importFromExelCandidates
);

export default candidateRouter;

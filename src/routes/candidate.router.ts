import express from 'express';
import CandidateController from '../controllers/candidate.controller';

const candidateRouter = express.Router();

candidateRouter.post('/', CandidateController.createCandidate);

candidateRouter.get('/', CandidateController.getAllCandidates);

candidateRouter.get('/:candidateID', CandidateController.getCandidateByID);

candidateRouter.patch(
	'/update/:candidateID',
	CandidateController.updateCandidateByID
);

export default candidateRouter;

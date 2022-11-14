import { Request, Response } from 'express';

import Controller from './index';
import errorsCatcher from '../utils/errorsCatcher';
import CandidateModel from '../models/candidate.model';

class CandidateController extends Controller {
	static async getAllCandidates(req: Request, res: Response) {
		try {
			const listCandidates = await CandidateModel.getAllCandidates(
				req,
				res
			);

			return res.send(listCandidates);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createCandidate(req: Request, res: Response) {
		try {
			const newCandidates = await CandidateModel.createCandidate(
				req,
				res
			);

			return res.send(newCandidates);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async getCandidateByID(req: Request, res: Response) {
		try {
			const userByID = await CandidateModel.getCandidateByID(req, res);

			return res.send(userByID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async updateCandidateByID(req: Request, res: Response) {
		try {
			const updatedCandidate = await CandidateModel.updateCandidateByID(
				req,
				res
			);

			return res.send(updatedCandidate);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default CandidateController;

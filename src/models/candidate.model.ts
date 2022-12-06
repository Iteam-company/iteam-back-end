import { Request, Response } from 'express';

import Model from '.';
import PaginationService from '../services/pagination';
import errorsCatcher from '../utils/errorsCatcher';
import CandidateSchema from './schems/candidateSchema';

class CandidateModel extends Model {
	static async getAllCandidates(req: Request, res: Response) {
		try {
			return await PaginationService.paginationAndSort(
				req,
				CandidateSchema
			);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createCandidate(req: Request, res: Response) {
		try {
			const {
				email,
				name,
				surname,
				site,
				phone,
				expirienceInIt,
				english,
				addres,
				salary,
				dateInterview,
				cvLink,
				cvFile,
				status,
				comments,
			} = req.body;

			const newCandidate = new CandidateSchema({
				email,
				name,
				surname,
				site,
				phone,
				expirienceInIt,
				english,
				addres,
				salary,
				dateInterview,
				cvLink,
				cvFile,
				status,
				comments,
			});

			await newCandidate.save();

			return newCandidate;
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 500, 'Wrong data, check and try again');
		}
	}

	static async getCandidateByID(req: Request, res: Response) {
		const candidateID = req.params.candidateID;

		if (!candidateID) return res.sendStatus(403);

		try {
			return await CandidateSchema.findById(candidateID);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 404);
		}
	}

	static async updateCandidateByID(req: Request, res: Response) {
		const candidateID = req.params.candidateID;

		if (!candidateID) return res.sendStatus(403);

		const dataForUpdate = req.body;

		if (!dataForUpdate) return res.sendStatus(200);

		try {
			const updatedCandidate = await CandidateSchema.findOneAndUpdate(
				{ _id: candidateID },
				dataForUpdate
			);

			return { ...updatedCandidate?.toObject(), ...dataForUpdate };
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default CandidateModel;

import { NextFunction, Request, Response } from 'express';
import CheckerDuplicateCandidate from '../services/checkerDuplicateCandidate';
import UserInterface from '../models/interfaces/user.interface';
import errorsCatcher from '../utils/errorsCatcher';

const checkDuplicateCandidate = async (
	req: Request & { user?: UserInterface },
	res: Response,
	next: NextFunction
) => {
	const { email, phone, name, surname } = req.body;

	try {
		// refactoring
		const checkEmails = await CheckerDuplicateCandidate.checkEmails(email);

		const checkPhones = await CheckerDuplicateCandidate.checkPhones(phone);

		const checkNamesAndSurnames =
			await CheckerDuplicateCandidate.checkNamesAndSurnames(
				name,
				surname
			);

		if (checkEmails && checkEmails?.length > 0) {
			return res
				.send({
					message: 'Possible duplicati email',
					possibleDuplication: checkEmails,
				})
				.status(409);
		} else if (checkPhones && checkPhones.length > 0) {
			return res
				.send({
					message: 'Possible duplicati phone',
					possibleDuplication: checkPhones,
				})
				.status(409);
		} else if (checkNamesAndSurnames && checkNamesAndSurnames.length > 0) {
			return res
				.send({
					message: 'Possible duplicati name and surname',
					possibleDuplication: checkNamesAndSurnames,
				})
				.status(409);
		} else {
			return next();
		}
	} catch (e) {
		errorsCatcher(res, 500, 'Wrong data, check and try again');
	}
};

export default checkDuplicateCandidate;

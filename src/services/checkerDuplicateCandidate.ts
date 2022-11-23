import Candidates from '../models/schems/candidateSchema';

class CheckerDuplicateCandidate {
	// refactoring
	static async checkPhones(phone: string) {
		try {
			return await Candidates.find({ phone });
		} catch (e) {
			console.error(e);
		}
	}

	static async checkEmails(email: string) {
		try {
			return await Candidates.find({ email });
		} catch (e) {
			console.error(e);
		}
	}

	static async checkNamesAndSurnames(name: string, surname: string) {
		try {
			return await Candidates.find({ name, surname });
		} catch (e) {
			console.error(e);
		}
	}
}

export default CheckerDuplicateCandidate;

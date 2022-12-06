import Service from '.';
import Candidates from '../models/schems/candidateSchema';

class CheckerDuplicateCandidate extends Service {
	static async checkData(data: object) {
		try {
			return await Candidates.find({ ...data });
		} catch (e) {
			console.error(e);
		}
	}
}

export default CheckerDuplicateCandidate;

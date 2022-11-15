import Candidates from '../models/schems/candidateSchema';
import xlsxj from 'xlsx-to-json';
import { CandidateInterface } from '../models/interfaces/candidate.interface';

class ImportFiles {
	static async candidatesFormExelToJson(filePath: string): Promise<[]> {
		return new Promise((res, rej) => {
			xlsxj(
				{
					input: filePath,
					output: filePath.replace('xlsx', 'json'),
				},
				(err: any, resArr: []) => {
					if (err) {
						console.error(err);
						return rej(null);
					}
					return res(resArr);
				}
			);
		});
	}
	//////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// static async formatingcandidateInJson(arr: []): CandidateInterface[] {}

	static async insertCandidateToDB(arrCandidates: CandidateInterface[]) {
		try {
			// inserting into the table candidates
			return Candidates.insertMany(arrCandidates, (err, result) => {
				if (err) console.error(err);
				if (result) {
					console.log('File imported successfully.');
					// res.redirect('/');
				}
			});
		} catch (e) {
			console.error(e);
		}
	}
}

export default ImportFiles;

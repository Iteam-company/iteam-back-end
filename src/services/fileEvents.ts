import xlsxj from 'xlsx-to-json';
import fs from 'fs';

import Candidates from '../models/schems/candidateSchema';
import {
	CandidateInterface,
	ExelCandidateInterface,
} from '../models/interfaces/candidate.interface';

class FileEvents {
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

	static formatingCandidateInJson(
		arr: ExelCandidateInterface[] //for export change object of exel candidates !!!
	): CandidateInterface[] {
		const formatedArray: CandidateInterface[] = arr.map((el) => {
			return {
				surname:
					el['FullName'].split(' ').length < 2
						? ''
						: el['FullName'].split(' ')[0],
				name:
					el['FullName'].split(' ').length < 2
						? el['FullName'].split(' ')[0]
						: el['FullName'].split(' ')[1],
				email: el['Email'],
				phone: el['Phone'],
				site: el['Site'],
				expirienceInIt: el['Experience'],
				english: el['English'],
				addres: el['Address'],
				salary: el['Salary'],
				dateInterview: el['Date interview'],
				cvLink: el['CV'].split('')[0] !== '/' ? el['CV'] : '',
				cvFile: el['CV'].split('')[0] === '/' ? el['CV'] : '',
				status: el['Status'],
			};
		});

		return formatedArray;
	}

	static insertCandidateToDB(arrCandidates: CandidateInterface[]) {
		return new Promise((res, rej) => {
			// inserting into the table candidates
			try {
				Candidates.insertMany(arrCandidates, (err, result) => {
					if (err) {
						console.error(err);
						return rej(null);
					}

					return res(result);
				});
			} catch (e) {
				console.error(e);
				return rej(null);
			}
		});
	}

	static deleteFileByPath(linkToFile: string) {
		fs.unlink(linkToFile, (err) => {
			if (err) {
				console.error('Error: --> ', err);
			} else {
				console.log('File deleted from: --> ', linkToFile);
			}
		});
	}
}

export default FileEvents;

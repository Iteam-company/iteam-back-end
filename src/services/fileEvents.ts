// unexisting package types it's ok
import xlsxj from 'xlsx-to-json';
import fs from 'fs';
import { ObjectId } from 'mongodb';

import Candidates from '../models/schems/candidateSchema';
import {
	CandidateInterface,
	ExelCandidateInterface,
} from '../models/interfaces/candidate.interface';
import Comments from '../models/schems/commentSchema';
import { CommentsInterface } from '../models/interfaces/comment.interface';
import Service from '.';

class FileEvents extends Service {
	// candidates
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
				cvLink: el['CV'].split('')[0] !== '/' ? el['CV'] : '', //change!!!!
				cvFile: el['CV'].split('')[0] === '/' ? el['CV'] : '', //change!!!!
				status: el['Status'],
				comments: el['comments'],
			};
		});

		return formatedArray;
	}

	// inserting into the table candidates
	static insertCandidateToDB(
		arrCandidates: CandidateInterface[]
	): Promise<CandidateInterface[]> {
		return new Promise((res, rej) => {
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

	//comments
	static formatingCommentsInJson(
		insertedData: CandidateInterface[],
		candidateInJSON: ExelCandidateInterface[]
	): CommentsInterface[] {
		// inserting into the table comments
		const clearArr = insertedData.map((cand, i) => ({
			text: candidateInJSON[i].comments,
			userID: new ObjectId(cand?._id?.toString()),
			authorID: new ObjectId('637619d444740f2fe4a98f23'),
		}));

		return clearArr.filter((el) => el.text);
	}

	// inserting into the table candidates
	static insertCommentsToDB(
		arrComments: CommentsInterface[]
	): Promise<CommentsInterface[]> {
		return new Promise((res, rej) => {
			try {
				Comments.insertMany(arrComments, (err, result) => {
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

	//	other
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

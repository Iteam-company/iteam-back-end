import { NextFunction, Request, Response } from 'express';
import LoggerService from '../services/logger';
import Project from '../models/schems/projectSchema';

import UserInterface from '../models/interfaces/user.interface';
import { LoggerActions } from '../models/interfaces/event.interface';

import { ObjectId } from 'mongodb';

const logger = async (
	req: Request & { user?: UserInterface },
	res: Response,
	next: NextFunction
) => {
	try {
		const { _id } = req.body;
		const { user } = req;

		if (!_id) return;
		if (!user) return;

		const oldProject = await Project.findById(_id);

		if (oldProject) {
			for (const key in req.body) {
				//adding new mainDev Log
				if (key === 'mainDevID') {
					await LoggerService.createLog({
						action: LoggerActions.userBecomesMainProjectDev,
						project: new ObjectId(_id.toString()),
						user: new ObjectId(req.body[key]),
						actionPerformer: new ObjectId(user._id.toString()),
						date: Date.now().toString(),
					});
					// adding replacement log for old main dev
					await LoggerService.createLog({
						action: LoggerActions.userLeavedProject,
						project: new ObjectId(_id.toString()),
						user: new ObjectId(oldProject.mainDevID),
						actionPerformer: new ObjectId(user._id.toString()),
						date: Date.now().toString(),
					});
				}

				if (key === 'subDevsID') {
					const prevProjectSubDevs = oldProject.subDevsID;
					const newProjectSubDevs: ObjectId[] = req.body[key];

					if (!prevProjectSubDevs || !newProjectSubDevs) return;

					const removedProjectDevs = prevProjectSubDevs.filter(
						(devId: any) => !newProjectSubDevs.includes(devId)
					);

					const addedProjectDevs = newProjectSubDevs.filter(
						(devId: any) => !prevProjectSubDevs.includes(devId)
					);

					removedProjectDevs.forEach(async (devId) => {
						await LoggerService.createLog({
							action: LoggerActions.userLeavedProject,
							project: _id,
							user: new ObjectId(devId.toString()),
							actionPerformer: new ObjectId(user._id.toString()),
							date: Date.now().toString(),
						});
					});

					addedProjectDevs.forEach(async (devId) => {
						await LoggerService.createLog({
							action: LoggerActions.userAssignedToProject,
							project: new ObjectId(_id.toString()),
							user: new ObjectId(devId.toString()),
							actionPerformer: new ObjectId(user._id.toString()),
							date: Date.now().toString(),
						});
					});
				}
			}
		}
	} catch (e: any) {
		next(e);
	}
};

export default logger;

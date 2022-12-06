import { Request, Response } from 'express';

import Model from '.';
import PaginationService from '../services/pagination';
import errorsCatcher from '../utils/errorsCatcher';
import ProjectSchema from './schems/projectSchema';

class ProjectModel extends Model {
	static async getAllProjects(req: Request, res: Response) {
		try {
			return await PaginationService.paginationAndSort(
				req,
				ProjectSchema
			);
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createProject(req: Request, res: Response) {
		try {
			const {
				name,
				iconUrl,
				mainDevID,
				subDevsID,
				history,
				technologies,
				startTime,
				endTime,
				status,
			} = req.body;

			const newProject = new ProjectSchema({
				name,
				iconUrl,
				mainDevID,
				subDevsID,
				history,
				technologies,
				startTime,
				endTime,
				status,
			});

			await newProject.save();

			return newProject;
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 500, 'Wrong data, check and try again');
		}
	}

	static async getProjectByID(req: Request, res: Response) {
		const projectID = req.params.projectID;

		if (!projectID) return res.sendStatus(403);

		try {
			return await ProjectSchema.findById({ _id: projectID });
		} catch (e) {
			console.error(e);
			return errorsCatcher(res, 404);
		}
	}

	static async updateProjectByID(req: Request, res: Response) {
		const projectID = req.params.projectID;

		if (!projectID) return res.sendStatus(403);

		const dataForUpdate = req.body;

		if (!dataForUpdate) return res.sendStatus(200);

		try {
			const updatedProject = await ProjectSchema.findOneAndUpdate(
				{ _id: projectID },
				dataForUpdate
			);

			return { ...updatedProject?.toObject(), ...dataForUpdate };
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async deleteProjectByID(req: Request, res: Response) {
		const projectID = req.params.projectID;

		if (!projectID) return res.sendStatus(403);

		try {
			return await ProjectSchema.findOneAndDelete({ _id: projectID });
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default ProjectModel;

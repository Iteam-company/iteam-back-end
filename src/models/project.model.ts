import { Request, Response } from 'express';

import Model from '.';
import errorsCatcher from '../utils/errorsCatcher';
import projectSchema from './schems/projectSchema';

class ProjectModel extends Model {
	static async getAllProjects(req: Request, res: Response) {
		try {
			return await projectSchema.find({});
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}

	static async createProject(req: Request, res: Response) {
		try {
			const { email, password, name, surname } = req.body;

			const newProject = new projectSchema({
				email,
				password,
				name,
				surname,
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
			return await projectSchema.findById({ _id: projectID });
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
			const updatedProject = await projectSchema.findOneAndUpdate(
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
			return await projectSchema.findOneAndDelete({ _id: projectID });
		} catch (e) {
			console.error(e);
			return errorsCatcher(res);
		}
	}
}

export default ProjectModel;

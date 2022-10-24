import { Request, Response } from 'express';

import Controller from './index';
import errorsCatcher from '../utils/errorsCatcher';
import ProjectModel from '../models/project.model';

class ProjectController extends Controller {
	static async getAllProjects(req: Request, res: Response) {
		try {
			const listProjects = await ProjectModel.getAllProjects(req, res);

			return res.send(listProjects);
		} catch (e) {
			console.error(e);
			errorsCatcher(res);
		}
	}

	static async createProject(req: Request, res: Response) {
		try {
			const newProjects = await ProjectModel.createProject(req, res);

			return res.send(newProjects);
		} catch (e) {
			console.error(e);
			errorsCatcher(res);
		}
	}

	static async getProjectByID(req: Request, res: Response) {
		try {
			const projectByID = await ProjectModel.getProjectByID(req, res);

			return res.send(projectByID);
		} catch (e) {
			console.error(e);
			errorsCatcher(res);
		}
	}

	static async updateProjectByID(req: Request, res: Response) {
		try {
			const updatedProject = await ProjectModel.updateProjectByID(
				req,
				res
			);

			return res.send(updatedProject);
		} catch (e) {
			console.error(e);
			errorsCatcher(res);
		}
	}

	static async deleteProjectByID(req: Request, res: Response) {
		try {
			const deletedProject = await ProjectModel.deleteProjectByID(
				req,
				res
			);

			return res.send(deletedProject);
		} catch (e) {
			console.error(e);
			errorsCatcher(res);
		}
	}
}

export default ProjectController;

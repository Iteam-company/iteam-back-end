import { Request, Response } from 'express';
import errorsCatcher from '../utils/errorsCatcher';
import Controller from './index';

class TestController extends Controller {
	static async getTestRequest(req: Request, res: Response) {
		try {
			res.send({ message: 'Test message' });
		} catch (e) {
			errorsCatcher(res);
		}
	}
}

export default TestController;

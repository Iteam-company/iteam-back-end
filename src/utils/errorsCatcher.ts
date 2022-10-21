import { Response } from 'express';

const errorsCatcher = (res: Response, code = 500, msg?: string) => {
	return res.status(code).send({ err: msg });
};

export default errorsCatcher;

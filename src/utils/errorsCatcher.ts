import { Response } from 'express';

const errorsCatcher = (res: Response, code: number = 500, msg?: string) => {
	res.status(code).send({ err: msg });
};

export default errorsCatcher;

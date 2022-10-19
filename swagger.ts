import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import appInstance from '.';
import { Application } from 'express';

const swaggerOptions = {
	explorer: true,
};

export const initSwagger = (app: Application) => {
	app.use(
		'/swagger',
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocument, swaggerOptions)
	);
};

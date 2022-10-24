import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger';

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

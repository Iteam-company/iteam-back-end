import express from 'express';
import mongoose from 'mongoose';
import * as swaggerUi from 'swagger-ui-express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import * as swaggerDocument from './swagger';
import { PORT, API_URL, DB_PORT, DB_USER, DB_PWD, DB_HOST } from './env';
import routes from './src/routes/index';
import path from 'path';

const corsOptions: CorsOptions = {
	origin: ['0.0.0.0', '127.0.0.1', 'localhost', 'http://localhost:3000'],
	credentials: true,
	methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
	allowedHeaders: [
		'AccessToken',
		'RefreshToken',
		'authorization',
		'X-Requested-With',
		'content-type',
		'sentry-trace',
		'Accept',
		'Referer',
		'User-Agent',
	],
	preflightContinue: false,
};

class App {
	public _app: express.Application;
	public env: string;
	public port: string | number;
	public API_URL: string;

	constructor() {
		this._app = express();
		this.env = 'development';
		this.API_URL = API_URL || '0.0.0.0';
		this.port = PORT || 8888;

		this._app.use(cors(corsOptions));
		this._app.use(express.urlencoded({ extended: false }));
		this._app.use(cookieParser());
		this._app.use(express.json());

		// for access to images
		const dir = path.join(__dirname, 'public');
		this._app.use(express.static(dir));
	}

	connectMongoDb() {
		try {
			const connectionString = `mongodb${
				DB_PORT || '+srv'
			}://${DB_USER}:${DB_PWD}@${DB_HOST}/?retryWrites=true&w=majority`;

			mongoose.connect(connectionString);
		} catch (e) {
			console.error(e);
		}

		return this;
	}

	connectRoutes() {
		routes.forEach(({ router, path }) => {
			this._app.use(path, router);
		});

		return this;
	}

	initSwagger() {
		const swaggerOptions = {
			explorer: true,
		};
		this._app.use(
			'/swagger',
			swaggerUi.serve,
			swaggerUi.setup(swaggerDocument, swaggerOptions)
		);

		return this;
	}

	public async listen() {
		this._app.listen(this.port, () => {
			console.log(`======= ENV: ${this.env} ========`);
			console.log(`🚀 App listening on the port ${this.port}`);
			console.log(`🎮 http://${this.API_URL}:${this.port}`);
		});
	}
}

const appInstance = new App()
	.connectRoutes()
	.connectMongoDb()
	.initSwagger()
	.listen();

export default appInstance;

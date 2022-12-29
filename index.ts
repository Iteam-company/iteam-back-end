import express from 'express';
import mongoose from 'mongoose';
import * as swaggerUi from 'swagger-ui-express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import * as swaggerDocument from './swagger';
import {
	PORT,
	API_URL,
	DB_PORT,
	DB_USER,
	DB_PWD,
	DB_HOST,
	NODE_ENV,
} from './env';
import routes from './src/routes/index';
import path from 'path';
import { allLayoutsForTest } from './src/utils/emailLayouts';

const corsOptions: CorsOptions = {
	origin: '*',
	credentials: true,
	methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
	allowedHeaders: [
		'AccessToken',
		'RefreshToken',
		'authorization',
		'X-Requested-With',
		'content-type',
		'Accept',
		'Referer',
		'User-Agent',
	],
	preflightContinue: false,
};

class App {
	public _app: express.Application;
	public port: string | number;
	public api_url: string;

	constructor() {
		this._app = express();
		this.api_url = API_URL || '0.0.0.0';
		this.port = PORT || 8888;

		this._app.use(cors(corsOptions));
		this._app.use(express.urlencoded({ extended: false }));
		this._app.use(cookieParser());
		this._app.use(express.json());

		// for access to images
		const dir = path.join(__dirname, 'public');
		this._app.use(express.static(dir));

		//temporary needed for test email`s layout
		this._app.get('/test-email-layout', (req, res) => {
			res.send(`${allLayoutsForTest()}`);
		});
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

		console.log(NODE_ENV, 'NODE_ENVNODE_ENVNODE_ENVNODE_ENV');

		switch (NODE_ENV) {
			case 'production':
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(swaggerDocument as any).host = 'iteam-back-end.onrender.com';
				break;
			case 'development':
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(swaggerDocument as any).host = `${this.api_url || '0.0.0.0'}:${
					this.port || 8888
				}`;
				break;

			default:
				(swaggerDocument as any).host = `${this.api_url || '0.0.0.0'}:${
					this.port || 8888
				}`;
				break;
		}
		this._app.use(
			'/swagger',
			swaggerUi.serve,
			swaggerUi.setup(swaggerDocument, swaggerOptions)
		);

		// console.log(swaggerDocument,'swaggerDocumentswaggerDocumentswaggerDocumentswaggerDocument')

		return this;
	}

	public async listen() {
		this._app.listen(this.port || 8888, () => {
			console.log(`======= ENV ========`);
			console.log(`🚀 App listening on the port ${this.port || 8888}`);
			console.log(
				`🎮 http://${this.api_url || '0.0.0.0'}:${this.port || 8888}`
			);
		});
	}
}

const appInstance = new App()
	.connectRoutes()
	.connectMongoDb()
	.initSwagger()
	.listen();

export default appInstance;

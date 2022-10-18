import express from 'express';
import mongoose from 'mongoose';
import { PORT, DB_PORT, DB_USER, DB_PWD, DB_HOST } from './env';
import routes from './src/routes/index';
class App {
	public _app: express.Application;
	public env: string;
	public port: string | number;

	constructor() {
		this._app = express();
		this.env = 'development';
		this.port = PORT || 3000;
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

	public async listen() {
		this._app.listen(this.port, () => {
			console.log(`======= ENV: ${this.env} ========`);
			console.log(`🚀 App listening on the port ${this.port}`);
			console.log(`🎮 http://localhost:${this.port}`);
		});
	}
}

const appInstance = new App().connectRoutes().connectMongoDb().listen();

export default appInstance;

import { IteamApplication } from '../..';
import {
	createRestAppClient,
	givenHttpServerConfig,
	Client,
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
	const restConfig = givenHttpServerConfig({
		// Customize the server configuration here.
		// Empty values (undefined, '') will be ignored by the helper.
		//
		// host: process.env.HOST || 'localhost',
		// port: +process.env.PORT || 3000,
	});

	const app = new IteamApplication({
		rest: restConfig,
	});

	await app.boot();
	await app.start();

	const client = createRestAppClient(app);

	return { app, client };
}

export interface AppWithClient {
	app: IteamApplication;
	client: Client;
}

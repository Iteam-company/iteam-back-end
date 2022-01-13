import { once } from 'events';
import express from 'express';
import { Server } from 'http';


import {ApplicationConfig, IteamApplication} from './application';

export {ApplicationConfig};

export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: IteamApplication;
  private server?: Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new IteamApplication(options);

    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
  
    this.app.use(express.static('public'));
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port ?? 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
  }
}
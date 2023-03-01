import { NodeEnviromentTypes } from '../constants/env/node-enviroment-types';
import { EnviromentNames } from '../enums/enviroment-names';

export const getEnviroment = (enviromentName: EnviromentNames) =>
  process.env[enviromentName] ?? null;

export const isProd =
  getEnviroment(EnviromentNames.NODE_ENV) === NodeEnviromentTypes.NODE_ENV_PROD;

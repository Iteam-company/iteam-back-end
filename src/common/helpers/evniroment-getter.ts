import { EnviromentNames } from '../enums/enviroment-names';

export const getEnviroment = (enviromentName: EnviromentNames) =>
  process.env[enviromentName] ?? null;

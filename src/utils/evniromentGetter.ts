export enum EnviromentNames {
  NODE_ENV = 'NODE_ENV',

  PORT = 'PORT',

  POSTGRES_HOST = 'POSTGRES_HOST',
  POSTGRES_USER = 'POSTGRES_USER',
  POSTGRES_DB = 'POSTGRES_DB',
  POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
  POSTGRES_PORT = 'POSTGRES_PORT',

  JWT_PRIVATE_KEY = 'JWT_PRIVATE_KEY',
}

export const getEnviroment = (enviromentName: EnviromentNames) =>
  process.env[enviromentName] ?? null;

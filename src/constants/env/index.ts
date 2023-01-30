import { config } from 'dotenv';
import { env } from 'process';

config({ path: `../../../.${env.NODE_ENV}.env` });

export const {
  NODE_ENV,
  PORT,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = env;

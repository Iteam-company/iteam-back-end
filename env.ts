import { config } from 'dotenv';

import { env } from 'process';

config();

export const {
	NODE_ENV,
	API_URL,
	PORT,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	DB_USER,
	DB_PWD,
	ADMIN_EMAIL,
	ADMIN_PWD,
	JWT_ACCES_SECRET_KEY,
	JWT_REFRESH_SECRET_KEY,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASSWORD,
	CLIENT_URL,
	CLIENT_PORT,
} = env;

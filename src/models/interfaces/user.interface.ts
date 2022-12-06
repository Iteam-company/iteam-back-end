import { Document, ObjectId } from 'mongodb';

interface UserInterface extends Document {
	_id: ObjectId;
	email: string;
	password?: string;
	name: string;
	surname: string;
	role: Roles;
	workType: WorkTypes;
	avatarUrl: string;
	file: string;
	phone: string;
	offerDay: Date;
	birthday: Date;
	expirience: string;
	skills: string;
	stack: [];
	addres: string;
	city: number;
	team: [];
	company: ObjectId;
	salary: number;
	tokens: Tokens;
	links: string[];

	generateAccessToken: () => Promise<string>;
	generateRefreshToken: () => Promise<string>;
	hashPassword: () => Promise<string>;
	removePassword: () => Omit<UserInterface, 'password'>;
}

export enum Roles {
	ADMIN = 'ADMIN',
	HR = 'HR',
	RECRUTIER = 'RECRUTIER',
	DEV = 'DEV',
	INTERN = 'INTERN',
}

export enum WorkTypes {
	REMOUTE = 'REMOUTE',
	OFFICE = 'OFFICE',
	MIX = 'MIX',
}

export enum Statuses {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
}

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export default UserInterface;

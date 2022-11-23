import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserInterface, { Roles, WorkTypes } from '../interfaces/user.interface';
import ApplicationSchema from './applicationSchema';
import { JWT_ACCES_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from '../../../env';

const UserSchema = new Schema<UserInterface>({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: { type: String, min: 8, required: false },
	name: { type: String, required: true },
	surname: { type: String, required: true },
	role: {
		type: String,
		enum: [Roles.ADMIN, Roles.HR, Roles.RECRUTIER, Roles.DEV, Roles.INTERN],
		default: Roles.DEV,
	},
	workType: {
		type: String,
		enum: [WorkTypes.REMOUTE, WorkTypes.OFFICE, WorkTypes.MIX],
		default: WorkTypes.OFFICE,
	},
	avatarUrl: {
		type: String,
		default:
			'/img/default.webp' ||
			'https://res.cloudinary.com/iteam-cloud/image/upload/v1643381088/Iteam/iteam.logo_lrlwkj.jpg',
	},
	file: { type: String },
	phone: { type: String },
	offerDay: { type: Date, default: Date.now() },
	birthday: { type: Date },
	expirience: { type: String },
	skills: { type: String },
	stack: [{ type: ObjectId, ref: 'Stack' }],
	addres: { type: String },
	city: { type: Number },
	team: [{ type: ObjectId, ref: 'Teams' }],
	company: { type: ObjectId, ref: 'Company' },
	salary: { type: Number, default: 0 },
	tokens: { type: Object, default: {} },
	links: [{ type: ObjectId, ref: 'Links' }],
});

UserSchema.methods.generateAccessToken = async function () {
	try {
		const token = jwt.sign(
			{ _id: this._id },
			JWT_ACCES_SECRET_KEY as string,
			{
				expiresIn: '12h',
			}
		);

		this.tokens.accessToken = token;
		await this.save();

		return token;
	} catch (e) {
		console.log('err', e);
	}
};

UserSchema.methods.generateRefreshToken = async function () {
	try {
		const token = jwt.sign(
			{ _id: this._id },
			JWT_REFRESH_SECRET_KEY as string,
			{
				expiresIn: '30d',
			}
		);

		this.tokens.refreshToken = token;
		await this.save();

		return token;
	} catch (e) {
		console.log('err', e);
	}
};

UserSchema.methods.hashPassword = async function () {
	const rounds = 10;
	try {
		const hashedPassword = await bcrypt.hash(this.password, rounds);
		this.password = hashedPassword;
		await this.save();
	} catch (e) {
		console.log('err', e);
	}
};

UserSchema.post('save', async function () {
	const { email, name, surname } = this;

	const userApplication = new ApplicationSchema({
		email,
		fullName: `${name} ${surname}`,
		date: Date.now(),
	});

	await userApplication.save();
});

UserSchema.methods.removePassword = function () {
	const userCopy = this.toObject();
	delete userCopy.password;
	return userCopy;
};

const User = model('users', UserSchema);

export default User;

import { createTransport, Transporter, TransportOptions } from 'nodemailer';

import Service from '.';
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '../../env';

const maillist = ['jekasemenuk@ukr.net', 'sergienko339@gmail.com'];

class NodemailerService extends Service {
	transporter: Transporter;
	layout: string;

	constructor() {
		super();
		this.layout = ``;

		this.transporter = createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			secure: SMTP_USER,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASSWORD,
			},
		} as TransportOptions);
	}

	async checkStatusSMTP() {
		// verify connection configuration
		this.transporter.verify(function (error: any) {
			if (error) {
				console.log(error);
				console.error('It`s SMTP error from server');
			} else {
				console.log('Server is ready to take our messages');
			}
		});
	}

	async exampleMails(toMail: string | string[] = maillist) {
		if (this.layout === ``) {
			console.log('Send from...');
			this.layout = `<div>Here html</div>`;
		}

		try {
			await this.transporter.sendMail({
				from: SMTP_USER,
				to: toMail,
				subject: `Your subject`,
				text: `Your text`,
				html: this.layout,
			});
			console.log('Sent!');
		} catch (error) {
			console.log('Send => error !');

			console.error(error);
		}
	}
}

export default new NodemailerService();

import { Entity, model, property } from '@loopback/repository';

@model()
export class AllowedEmails extends Entity {
	@property({
		type: 'string',
		id: true,
		generated: false,
	})
	id?: string;

	@property({
		type: 'string',
		required: true,
	})
	email: string;

	constructor(data?: Partial<AllowedEmails>) {
		super(data);
	}
}

// export interface AllowedEmailsRelations {
// 	// describe navigational properties here
// }

// export type AllowedEmailsWithRelations = AllowedEmails & AllowedEmailsRelations;
export type AllowedEmailsWithRelations = AllowedEmails;

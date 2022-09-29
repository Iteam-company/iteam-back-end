import { Entity, model, property } from '@loopback/repository';

@model()
export class Projects extends Entity {
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
	name: string;

	@property({
		type: 'string',
	})
	mainParticipantId?: string;

	@property({
		type: 'array',
		itemType: 'string',
	})
	subParticipants?: [];

	@property({
		type: 'array',
		itemType: 'string',
	})
	technologies?: [];

	constructor(data?: Partial<Projects>) {
		super(data);
	}
}

export interface ProjectRelations {
	// describe navigational properties here
}

export type ProjectWithRelations = Projects & ProjectRelations;

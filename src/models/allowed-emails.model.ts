import {Entity, model, property} from '@loopback/repository';

@model()
export class AllowedEmails extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;


  constructor(data?: Partial<AllowedEmails>) {
    super(data);
  }
}

export interface AllowedEmailsRelations {
  // describe navigational properties here
}

export type AllowedEmailsWithRelations = AllowedEmails & AllowedEmailsRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class Logs extends Entity {
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
  action: string;

  @property({
    type: 'number',
    required: true,
  })
  date: number;


  constructor(data?: Partial<Logs>) {
    super(data);
  }
}

export interface LogsRelations {
  // describe navigational properties here
}

export type LogsWithRelations = Logs & LogsRelations;

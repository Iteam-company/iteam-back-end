import {Entity, model, property} from '@loopback/repository';

@model()
export class Logs extends Entity {
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
  action: string;

  @property({
    type: 'number',
    required: true,
  })
  date: number;

  @property({
    type: 'string',
    required: true,
  })
  msg: string;

  @property({
    type: 'string',
    required: true,
  })
  instanceId: string;

  @property({
    type: 'string',
    required: true
  })
  instanceType: string

  @property({
    type: 'string',
    required: false,
  })
  subInstanceId: string;

  @property({
    type: 'string',
    required: false
  })
  subInstanceType: string; 

  constructor(data?: Partial<Logs>) {
    super(data);
  }
}

export interface LogsRelations {
  // describe navigational properties here
}

export type LogsWithRelations = Logs & LogsRelations;

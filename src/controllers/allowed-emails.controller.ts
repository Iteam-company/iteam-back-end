import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AllowedEmails} from '../models';
import {AllowedEmailsRepository} from '../repositories';

export class AllowedEmailsController {
  constructor(
    @repository(AllowedEmailsRepository)
    public allowedEmailsRepository : AllowedEmailsRepository,
  ) {}

  @post('/allowed-emails/add')
  @response(200, {
    description: 'AllowedEmails model instance',
    content: {'application/json': {schema: getModelSchemaRef(AllowedEmails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AllowedEmails, {
            title: 'NewAllowedEmails',
            exclude: ['id'],
          }),
        },
      },
    })
    allowedEmails: Omit<AllowedEmails, 'id'>,
  ): Promise<AllowedEmails> {
    return this.allowedEmailsRepository.create(allowedEmails);
  }

  @get('/allowed-emails/count')
  @response(200, {
    description: 'AllowedEmails model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AllowedEmails) where?: Where<AllowedEmails>,
  ): Promise<Count> {
    return this.allowedEmailsRepository.count(where);
  }

  @get('/allowed-emails')
  @response(200, {
    description: 'Array of AllowedEmails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AllowedEmails, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AllowedEmails) filter?: Filter<AllowedEmails>,
  ): Promise<AllowedEmails[]> {
    return this.allowedEmailsRepository.find(filter);
  }

  @patch('/allowed-emails')
  @response(200, {
    description: 'AllowedEmails PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AllowedEmails, {partial: true}),
        },
      },
    })
    allowedEmails: AllowedEmails,
    @param.where(AllowedEmails) where?: Where<AllowedEmails>,
  ): Promise<Count> {
    return this.allowedEmailsRepository.updateAll(allowedEmails, where);
  }

  @get('/allowed-emails/{id}')
  @response(200, {
    description: 'AllowedEmails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AllowedEmails, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AllowedEmails, {exclude: 'where'}) filter?: FilterExcludingWhere<AllowedEmails>
  ): Promise<AllowedEmails> {
    return this.allowedEmailsRepository.findById(id, filter);
  }

  @patch('/allowed-emails/{id}')
  @response(204, {
    description: 'AllowedEmails PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AllowedEmails, {partial: true}),
        },
      },
    })
    allowedEmails: AllowedEmails,
  ): Promise<void> {
    await this.allowedEmailsRepository.updateById(id, allowedEmails);
  }

  @put('/allowed-emails/{id}')
  @response(204, {
    description: 'AllowedEmails PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() allowedEmails: AllowedEmails,
  ): Promise<void> {
    await this.allowedEmailsRepository.replaceById(id, allowedEmails);
  }

  @del('/allowed-emails/{id}')
  @response(204, {
    description: 'AllowedEmails DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.allowedEmailsRepository.deleteById(id);
  }
}

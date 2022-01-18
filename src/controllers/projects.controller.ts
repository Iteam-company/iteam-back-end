import { authenticate } from '@loopback/authentication';
import { inject, intercept } from '@loopback/core';
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
  RestBindings,
  Response
} from '@loopback/rest';
import { request } from 'express';
import {Projects, Users} from '../models';
import {ProjectRepository, UserRepository} from '../repositories';

@authenticate("jwt")
export class ProjectsController {
  constructor(
    @repository(ProjectRepository)
    public projectRepository : ProjectRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) {}

  @post('/projects/add')
  @intercept('actions-interceptor')
  @intercept('array-parser-interceptor')
  @response(200, {
    description: 'Project model instance',
    content: {'application/json': {schema: getModelSchemaRef(Projects)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projects, {
            title: 'NewProject',
            exclude: ['id'],
          }),
        },
      },
    })
    project: Omit<Projects, 'id'>,
  ): Promise<Projects> {
    console.log("Project", project);
    return this.projectRepository.create(project);
  }

  @get('/projects/count')
  @response(200, {
    description: 'Project model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Projects) where?: Where<Projects>,
  ): Promise<Count> {
    return this.projectRepository.count(where);
  }

  @get('/projects')
  @response(200, {
    description: 'Array of Project model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Projects, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Projects) filter?: Filter<Projects>,
  ): Promise<Projects[]> {
    return this.projectRepository.find(filter);
  }

  @patch('/projects')
  @response(200, {
    description: 'Project PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projects, {partial: true}),
        },
      },
    })
    project: Projects,
    @param.where(Projects) where?: Where<Projects>,
  ): Promise<Count> {
    return this.projectRepository.updateAll(project, where);
  }

  @get('/projects/{id}')
  @response(200, {
    description: 'Project model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Projects, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Projects, {exclude: 'where'}) filter?: FilterExcludingWhere<Projects>
  ): Promise<Projects> {
    return this.projectRepository.findById(id, filter);
  }

  @get('projects/{id}/participants')
  async getParticipants (
    @param.path.number('id') id: number,
  ): Promise<Response> {
    const project = await this.projectRepository.findById(id);
    const {sub_participants, main_participant_id} = project;

    const participantsIds = sub_participants?.map((id: string) => +id);

    const mainParticipant = await this.userRepository.findById(main_participant_id);
    const participants = await this.userRepository.find({where: {id: {inq: participantsIds}}});
    
    return this.response.status(200).json({participants, mainParticipant});
  }

  @patch('/projects/{id}')
  @response(204, {
    description: 'Project PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projects, {partial: true}),
        },
      },
    })
    project: Projects,
  ): Promise<void> {
    await this.projectRepository.updateById(id, project);
  }

  @put('/projects/{id}')
  @response(204, {
    description: 'Project PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() project: Projects,
  ): Promise<void> {
    await this.projectRepository.replaceById(id, project);
  }

  @del('/projects/{id}')
  @response(204, {
    description: 'Project DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.projectRepository.deleteById(id);
  }
}

import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { AssignLeadOfProjectDto } from './dto/assign-lead-of-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private usersService: UsersService,
  ) {}

  async createProject(dto: CreateProjectDto) {
    const project = await this.projectRepository.create(dto, {
      include: { all: true },
    });

    await project.reload({ include: { all: true } });

    return project;
  }

  async getAllProjects() {
    const projects = await this.projectRepository.findAll({
      include: { all: true },
    });

    return projects;
  }

  async getProjectById(id: number) {
    const project = await this.projectRepository.findByPk(id, {
      include: { all: true },
    });

    return project;
  }

  async deleteProjectById(id: string) {
    const project = await this.projectRepository.findByPk(id);

    if (project) {
      await project.destroy();
    }
  }

  async assignLeadOfProject(dto: AssignLeadOfProjectDto) {
    const { userId, projectId } = dto;

    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new HttpException(
        `user with id: ${userId} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const project = await this.projectRepository.findByPk(projectId);

    if (!project) {
      throw new HttpException(
        `project with id: ${projectId} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await project.$set('mainParticipant', user.id);

    return dto;
  }

  async assignParticipantOfProject(dto: AssignLeadOfProjectDto) {
    const { userId, projectId } = dto;

    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new HttpException(
        `user with id: ${userId} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const project = await this.projectRepository.findByPk(projectId);

    if (!project) {
      throw new HttpException(
        `project with id: ${projectId} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await project.$add('secondaryParticipants', user.id);

    return dto;
  }

  async updateProject(projectId: string, dto: UpdateProjectDto) {
    const project = await this.projectRepository.findByPk(projectId);

    if (!project) {
      throw new HttpException(
        `project with id: ${projectId} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedProject = await project.update(dto);

    await updatedProject.reload({ include: { all: true } });

    return updatedProject;
  }
}

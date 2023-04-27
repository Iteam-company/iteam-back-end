import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectModel } from '@nestjs/sequelize';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { HttpStatus } from '@nestjs/common/enums';
import { SetUserWorkTypeDto } from './dto/set-user-work-type.dto';
import { AssignAttachmentToUserDto } from './dto/assign-attachment-to-user.dto';
import { AssignTechnologyToUserDto } from './dto/assign-technology-to-user.dto';
import { AssignEducationInfoToUserDto } from './dto/assign-education-info-to-user.dto';
import { AssignWorkHistoryInfoToUserDto } from './dto/assign-work-history-info-to-user.dto';
import { AssignCvToUserDto } from './dto/assign-cv-to-user.dto';
import { RolesService } from '@/modules/authentication/roles/roles.service';
import { WorkTypesService } from '@/modules/work-types/work-types.service';
import { AttachmentsService } from '@/modules/attachments/attachments.service';
import { TechnologiesService } from '@/modules/technologies/technologies.service';
import { EducationInfosService } from '@/modules/education-infos/education-infos.service';
import { WorkHistoryInfoService } from '@/modules/work-history-info/work-history-info.service';
import { FilesService } from '@/modules/files/files.service';
import { GetPipeType } from '@/common/enums/get-pipes-type';
import { Criteries } from './enums/criteries';
import { getDbEntities } from '@/common/helpers/get-db-entities.helper';
import { UserPaginationDataResponseDto } from './dto/user-pagination-data-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
    private workTypesService: WorkTypesService,
    private attachmentsService: AttachmentsService,
    private technologiesService: TechnologiesService,
    private educationInfoService: EducationInfosService,
    private workHistoryInfoService: WorkHistoryInfoService,
    private fileService: FilesService,
  ) {}
  async createUser(dto: CreateUserDto) {
    const candidate = await this.getUserByEmail(dto.email);

    if (candidate) {
      throw new HttpException('Email already took', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('GUEST');

    await user.$set('roles', [role.id]);
    user.roles = [role];

    // set work type to OFFICE by default
    // const workType = await this.workTypesService.getWorkTypeByValue('OFFICE');
    // await user.$set('workType', [workType.id]);
    // user.workType = workType;

    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.userRepository.findByPk(id);

    if (user) {
      user.destroy();
    }
  }

  async getAllUsers(
    pipeType: GetPipeType,
    critery: Criteries,
    value: string,
    page: string,
    limit: string,
    url: string,
  ): Promise<UserPaginationDataResponseDto> {
    return getDbEntities(
      this.userRepository,
      page,
      limit,
      pipeType,
      critery,
      value,
      url,
    );
  }

  async getUserById(id: string | number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });

    if (!user) {
      throw new HttpException(
        `client with id: ${id} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new HttpException(
        `user with id: ${userId} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedUser = await user.update(dto);

    return updatedUser.reload({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async assignRoleToUser(dto: AssignUserRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);

    if (user && role) {
      await user.$add('roles', role.id);

      return dto;
    }

    throw new HttpException('user or role not found', HttpStatus.NOT_FOUND);
  }

  async setUserWorkType(dto: SetUserWorkTypeDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const workType = await this.workTypesService.getWorkTypeByValue(dto.value);

    if (user && workType) {
      await user.$set('workType', workType);

      return dto;
    }

    throw new HttpException(
      'user or work type not found',
      HttpStatus.NOT_FOUND,
    );
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('user not fount', HttpStatus.NOT_FOUND);
    }
    user.isBanned = true;
    user.banReason = dto.banReason;

    await user.save();

    return user;
  }

  async attachAttachment(dto: AssignAttachmentToUserDto) {
    const { comment, file, userId, publisherId } = dto;
    const [user, publisherUser] = await Promise.all([
      this.userRepository.findByPk(userId),
      this.userRepository.findByPk(publisherId),
    ]);

    if (!user || !publisherUser) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const attachment = await this.attachmentsService.createAttachment({
      comment,
      file,
    });

    await Promise.all([
      user.$add('attachedAttachments', attachment.id),
      publisherUser.$add('publishedAttachments', attachment.id),
    ]);

    return user.reload({ include: { all: true } });
  }

  async assignTechnologyToUser(dto: AssignTechnologyToUserDto) {
    const { technologyId, userId } = dto;

    const technology = await this.technologiesService.getTechnologyById(
      technologyId,
    );

    if (!technology) {
      throw new HttpException(
        `client with id: ${technologyId} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new HttpException(
        `user with id: ${user} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await user.$add('techStack', technology.id);

    return dto;
  }

  async assignEducationInfoToUser(dto: AssignEducationInfoToUserDto) {
    const { universityName, specialization, startDate, endDate, educationLevel, userId } = dto;

    const educationInfo = await this.educationInfoService.createEducationInfo({
      universityName,
      specialization,
      startDate,
      endDate,
      educationLevel
    });

    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new HttpException(
        `user with id: ${user} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await user.$add('educationInfo', educationInfo.id);

    return dto;
  }

  async assignWorkHistoryInfoToUser(dto: AssignWorkHistoryInfoToUserDto) {
    const { projectId, userId } = dto;

    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new HttpException(
        `user with id: ${user} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const workHistoryInfo =
      await this.workHistoryInfoService.createWorkHistoryInfo({
        projectId,
      });

    await user.$add('workHistory', workHistoryInfo.id);

    return dto;
  }

  async assignCvToUser(dto: AssignCvToUserDto) {
    const { userId, file } = dto;

    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new HttpException(
        `user with id: ${user} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileEntity = await this.fileService.upload(file);

    await user.$set('cv', fileEntity.id);

    return user.reload({ include: { all: true } });
  }
}

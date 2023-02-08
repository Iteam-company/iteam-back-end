import { RolesService } from '@/roles/roles.service';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectModel } from '@nestjs/sequelize';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { HttpStatus } from '@nestjs/common/enums';
import { SetUserWorkTypeDto } from './dto/set-user-work-type.dto';
import { WorkTypesService } from '@/work-types/work-types.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
    private workTypesService: WorkTypesService,
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

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, {
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
}

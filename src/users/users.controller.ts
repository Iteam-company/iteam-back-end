import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/auth/roles-auth.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { roles } from '@/constants/auth/roles';

import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SetUserWorkTypeDto } from './dto/set-user-work-type.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'assign role to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Roles(roles.GUEST.value)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/role')
  @HttpCode(HttpStatus.CREATED)
  assignRoleToUser(@Body() dto: AssignUserRoleDto) {
    return this.usersService.assignRoleToUser(dto);
  }

  @ApiOperation({ summary: 'set work type to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Roles(roles.GUEST.value)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/work-type')
  @HttpCode(HttpStatus.CREATED)
  setUserWorkType(@Body() dto: SetUserWorkTypeDto) {
    return this.usersService.setUserWorkType(dto);
  }

  @ApiOperation({ summary: 'ban user by id' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Roles(roles.GUEST.value)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/ban')
  @HttpCode(HttpStatus.CREATED)
  banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }
}

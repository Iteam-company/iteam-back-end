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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger/dist/decorators';
import { AssignAttachmentToUserDto } from './dto/assign-attachment-to-user.dto';
import { AssignEducationInfoToUserDto } from './dto/assign-education-info-to-user.dto';
import { AssignTechnologyToUserDto } from './dto/assign-technology-to-user.dto';
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

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'attachment assigment' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @HttpCode(HttpStatus.CREATED)
  @Post('assign-attachment')
  @UseInterceptors(FileInterceptor('file'))
  attachAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: AssignAttachmentToUserDto,
  ) {
    return this.usersService.attachAttachment({ ...dto, file });
  }

  @ApiOperation({ summary: 'assign technology to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/technology')
  @HttpCode(HttpStatus.CREATED)
  assignTechnologyToUser(@Body() dto: AssignTechnologyToUserDto) {
    return this.usersService.assignTechnologyToUser(dto);
  }

  @ApiOperation({ summary: 'assign technology to user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  // @Roles(roles.GUEST.value)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/education-info')
  @HttpCode(HttpStatus.CREATED)
  assignEducationInfoToUser(@Body() dto: AssignEducationInfoToUserDto) {
    return this.usersService.assignEducationInfoToUser(dto);
  }
}

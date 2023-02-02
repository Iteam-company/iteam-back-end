import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles } from '@/auth/roles-auth.decorator';
import { RolesGuard } from '@/auth/roles.guard';
import { roles } from '@/constants/auth/roles';
import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(roles.ADMIN.value)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @HttpCode(200)
  getAll() {
    return this.usersService.getAllUsers();
  }
}

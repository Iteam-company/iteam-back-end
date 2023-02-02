import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sing-in')
  singIn(@Body() userDto: CreateUserDto) {
    return this.authService.singIn(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}

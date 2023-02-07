import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Controller, Post, Body, Req, HttpCode, Res } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(200)
  @Post('/sign-in')
  singIn(@Body() userDto: CreateUserDto) {
    return this.authService.singIn(userDto);
  }

  @HttpCode(200)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @HttpCode(200)
  @Post('/refresh')
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // we use cookie parser middleware so there we just get cookies
    const { cookies } = request as Request & { cookies: any };
    console.log(cookies, 'cookiescookiescookiescookies');
    const tokens = this.authService.refresh('aue');

    return;
  }
}

import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Controller, Post, Body, Req, HttpCode, Res } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist/decorators';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CookiesStorageKeys } from '@/constants/auth/cookies-storage-keys';
import { thirtyDaysInMilliseconds } from '@/constants/auth/timeDescriptionInMilliseconds';
import { HttpStatus } from '@nestjs/common/enums';

@ApiBearerAuth()
@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async singIn(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authorizedData = await this.authService.singIn(userDto);
    response.cookie(
      CookiesStorageKeys.REFRESH_TOKEN,
      authorizedData.tokens.refreshToken,
      { maxAge: thirtyDaysInMilliseconds, httpOnly: true },
    );
    delete authorizedData.tokens.refreshToken;

    return authorizedData;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const registeredData = await this.authService.registration(userDto);

    response.cookie(
      CookiesStorageKeys.REFRESH_TOKEN,
      registeredData.tokens.refreshToken,
      { maxAge: thirtyDaysInMilliseconds, httpOnly: true },
    );
    delete registeredData.tokens.refreshToken;
    return registeredData;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // we use cookie parser middleware so there we just get cookies
    const { refreshToken } = request.cookies;

    const refreshData = await this.authService.refresh(refreshToken);

    response.cookie(
      CookiesStorageKeys.REFRESH_TOKEN,
      refreshData.tokens.refreshToken,
      { maxAge: thirtyDaysInMilliseconds, httpOnly: true },
    );
    delete refreshData.tokens.refreshToken;
    return refreshData;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-out')
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // we use cookie parser middleware so there we just get cookies
    const { refreshToken } = request.cookies;

    await this.authService.signOut({ token: refreshToken });

    response.clearCookie(CookiesStorageKeys.REFRESH_TOKEN);
  }
}

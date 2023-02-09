import { AllowedRegistrationEmailsService } from '@/allowed-registration-emails/allowed-registration-emails.service';
import { RemoveTokenDto } from '@/tokens/dto/delete-token.dto';
import { TokensService } from '@/tokens/tokens.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
    private allowedRegistrationEmailsService: AllowedRegistrationEmailsService,
  ) {}

  async singIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    const tokens = await this.tokensService.generateTokens(user);

    await this.tokensService.saveRefreshToken({
      userId: user.id,
      token: tokens.refreshToken,
    });

    await user.reload({ include: { all: true } });

    return { tokens, user };
  }

  async signOut(dto: RemoveTokenDto) {
    await this.tokensService.removeToken(dto);
  }

  async registration(userDto: CreateUserDto) {
    const isEmailAllowed =
      await this.allowedRegistrationEmailsService.getAllowedEmailByEmail(
        userDto.email,
      );

    if (!isEmailAllowed) {
      throw new HttpException(
        'Email is not in whitelist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('Email already took', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const tokens = await this.tokensService.generateTokens(user);

    await this.tokensService.saveRefreshToken({
      userId: user.id,
      token: tokens.refreshToken,
    });

    await user.reload({ include: { all: true } });
    return { tokens, user };
  }

  async refresh(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new HttpException(
          'refresh token not provided',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const decodedPayload = await this.tokensService.validateToken(
        refreshToken,
      );
      const tokenFromDb = await this.tokensService.findToken({
        token: refreshToken,
      });

      if (!decodedPayload || !tokenFromDb) {
        throw new HttpException(
          'refresh token not valid or token from db not finded',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const userFromDb = await this.userService.getUserById(decodedPayload.id);
      const tokens = await this.tokensService.generateTokens(userFromDb);

      await this.tokensService.saveRefreshToken({
        userId: userFromDb.id,
        token: tokens.refreshToken,
      });

      await userFromDb.reload({ include: { all: true } });

      return { tokens, user: userFromDb };
    } catch (error) {
      throw new HttpException('token not valid', HttpStatus.UNAUTHORIZED);
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new HttpException(
        'user with this email does not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!passwordEquals) {
      throw new HttpException('incorrect password', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}

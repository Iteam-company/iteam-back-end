import { User } from '@/modules/users/user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTokenDto } from './dto/create-token.dto';
import { RemoveTokenDto } from './dto/delete-token.dto';
import { FindByUserIdTokenDto } from './dto/find-token-by-user-id.dto';
import { FindTokenDto } from './dto/find-token.dto';
import { Token } from './token.model';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Token) private tokensRepository: typeof Token,
  ) {}
  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { email: user.email, id: user.id, roles: user.roles },
        {
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { email: user.email, id: user.id, roles: user.roles },
        {
          expiresIn: '1d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(dto: CreateTokenDto) {
    const { userId, token } = dto;
    const existToken = await this.tokensRepository.findOne({
      where: { userId },
    });

    if (existToken) {
      existToken.token = token;
      await existToken.save();

      return;
    }

    await this.tokensRepository.create({
      userId,
      token,
    });
  }

  async removeToken(dto: RemoveTokenDto) {
    const { token } = dto;
    const findedToken = await this.tokensRepository.findOne({
      where: { token },
    });

    if (findedToken) {
      await findedToken.destroy();
    }
  }

  async findTokenByUserId(dto: FindByUserIdTokenDto) {
    const { userId } = dto;
    const findedToken = await this.tokensRepository.findOne({
      where: { userId },
    });

    return findedToken;
  }

  async findToken(dto: FindTokenDto) {
    const { token } = dto;

    const findedToken = await this.tokensRepository.findOne({
      where: { token },
    });

    return findedToken;
  }

  async validateToken(token: string) {
    const user =
      this.jwtService.verifyAsync<Pick<User, 'email' | 'id' | 'roles'>>(token);
    return user;
  }
}

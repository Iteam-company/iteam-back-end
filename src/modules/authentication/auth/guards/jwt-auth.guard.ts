import { TokensService } from '@/modules/authentication/tokens/tokens.service';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;

      const splitedAuthHeader = authHeader.split(' ');
      const bearer = splitedAuthHeader[0];
      const token = splitedAuthHeader[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'authorization header is wrong',
        });
      }

      const user = await this.tokensService.validateToken(token);

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'error on verifying access token',
      });
    }
  }
}

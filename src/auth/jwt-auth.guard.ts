import { TokensService } from '@/tokens/tokens.service';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;

      const splitedAuthHeader = authHeader.split(' ');
      const bearer = splitedAuthHeader[0];
      const token = splitedAuthHeader[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'not authorized' });
      }

      const user = this.tokensService.validateToken(token);

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'not authorized' });
    }
  }
}

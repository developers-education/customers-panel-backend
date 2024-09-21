import { ICreateAccessTokenCase } from '@/domain/users/types/create-access-token-case.interface';
import { IJWTService } from '@/domain/jwt/types/jwt-service.interface';
import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { IConfig } from '@/infrastructure/config/types/config.interface';

export class CreateAccessTokenCase implements ICreateAccessTokenCase {
  constructor(
    private readonly logger: ILogger,
    private readonly config: IConfig,
    private readonly jwtService: IJWTService,
  ) {}

  async execute(userId: string): Promise<string> {
    this.logger.info('Starting token creating.', { userId });

    const accessToken = await this.jwtService.createToken({
      payload: {
        id: userId,
      },
      secret: this.config.jwt.secret,
      expirationTime: this.config.jwt.accessToken.expirationTime,
    });

    this.logger.info('Token was created.', { userId });

    return accessToken;
  }
}

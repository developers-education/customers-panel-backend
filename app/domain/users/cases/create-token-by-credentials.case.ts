import { UserNotFoundError } from '@/domain/users/errors/user-not-found.error';
import { UserWrongPasswordError } from '@/domain/users/errors/user-wrong-password.error';
import { ICryptographyService } from '@/domain/cryptography/types/cryptography-service.interface';
import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { ICreateTokenByCredentialsCase } from '@/domain/users/types/create-token-by-credentials-case.interface';
import { IUsersRepository } from '@/domain/users/types/users-repository.interface';
import { UserCredentials } from '@/domain/users/types/shared';
import { ICreateAccessTokenCase } from '@/domain/users/types/create-access-token-case.interface';

export class CreateTokenByCredentialsCase implements ICreateTokenByCredentialsCase {
  constructor(
    private readonly logger: ILogger,
    private readonly usersRepository: IUsersRepository,
    private readonly cryptographyService: ICryptographyService,
    private readonly createAccessTokenCase: ICreateAccessTokenCase,
  ) {}
  async execute(credentials: UserCredentials): Promise<string> {
    const { login, password } = credentials;
    this.logger.info('Starting token creating by user credentials', { login });

    const user = await this.usersRepository.getUserByLogin(login);
    if (!user) {
      throw new UserNotFoundError();
    }

    const passwordHash = await this.cryptographyService.hash(password, user.salt, 1000);
    const isRightPassword = user.isCorrectPasswordHash(passwordHash);
    if (!isRightPassword) {
      throw new UserWrongPasswordError();
    }

    const token = await this.createAccessTokenCase.execute(user.id);

    this.logger.info('Token was created by user credentials.', { user });

    return token;
  }
}

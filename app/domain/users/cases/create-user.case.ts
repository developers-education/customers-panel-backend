import { User } from '@/domain/users/entities/user.entity';
import { UserLoginTakenError } from '@/domain/users/errors/user-login-taken.error';
import { ICryptographyService } from '@/domain/cryptography/types/cryptography-service.interface';
import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { UserCredentials } from '@/domain/users/types/shared';
import { ICreateUserCase } from '@/domain/users/types/create-user-case.interface';
import { IUsersRepository } from '@/domain/users/types/users-repository.interface';
import { ICreateAccessTokenCase } from '@/domain/users/types/create-access-token-case.interface';

export class CreateUserCase implements ICreateUserCase {
  constructor(
    private readonly logger: ILogger,
    private readonly usersRepository: IUsersRepository,
    private readonly createAccessTokenCase: ICreateAccessTokenCase,
    private readonly cryptographyService: ICryptographyService,
  ) {}
  async execute(credentials: UserCredentials): Promise<string> {
    const { login, password } = credentials;
    this.logger.info('Starting user creating.', { login });

    const isLoginTaken = await this.checkIsLoginTaken(login);
    if (isLoginTaken) {
      throw new UserLoginTakenError({ login });
    }

    const user = await this.createUser(login, password);
    await this.usersRepository.saveUser(user);

    const token = await this.createAccessTokenCase.execute(user.id);

    this.logger.info('User was created.', user);
    return token;
  }

  private async checkIsLoginTaken(login: string): Promise<boolean> {
    return !!(await this.usersRepository.getUserByLogin(login));
  }

  private async createUser(login: string, password: string): Promise<User> {
    const salt = this.cryptographyService.random(20);
    const passwordHash = await this.cryptographyService.hash(
      password,
      salt,
      1000,
    );

    return new User({
      login,
      passwordHash,
      salt,
    });
  }
}

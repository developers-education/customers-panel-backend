import { UsersRepository } from '@/domain/users/repositories/users.repository';
import { CreateUserCase } from '@/domain/users/cases/create-user.case';
import { CreateTokenByCredentialsCase } from '@/domain/users/cases/create-token-by-credentials.case';
import { ValidateTokenCase } from '@/domain/users/cases/validate-token.case';
import { CreateAccessTokenCase } from '@/domain/users/cases/create-access-token.case';
import { asClass, Resolver } from 'awilix';
import { IUsersRepository } from '@/domain/users/types/users-repository.interface';
import { appDi } from '@/infrastructure/ioc-container';
import { ICreateAccessTokenCase } from '@/domain/users/types/create-access-token-case.interface';
import { ICreateUserCase } from '@/domain/users/types/create-user-case.interface';
import { ICreateTokenByCredentialsCase } from '@/domain/users/types/create-token-by-credentials-case.interface';
import { IValidateTokenCase } from '@/domain/users/types/validate-token.interface';

appDi.register({
  usersRepository: asClass(
    UsersRepository,
  ).singleton() satisfies Resolver<IUsersRepository>,
  createAccessTokenCase: asClass(
    CreateAccessTokenCase,
  ).singleton() satisfies Resolver<ICreateAccessTokenCase>,
  createUserCase: asClass(
    CreateUserCase,
  ).singleton() satisfies Resolver<ICreateUserCase>,
  validateTokenCase: asClass(
    ValidateTokenCase,
  ).singleton() satisfies Resolver<IValidateTokenCase>,
  createTokenByCredentialsCase: asClass(
    CreateTokenByCredentialsCase,
  ).singleton() satisfies Resolver<ICreateTokenByCredentialsCase>,
});

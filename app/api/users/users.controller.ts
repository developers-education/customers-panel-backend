import { H3Event, readValidatedBody, setCookie, setResponseStatus } from 'h3';
import { loginUserSchema } from './schemas/login-user.schema';
import { createUserSchema } from './schemas/create-user.schema';
import {
  IConfig,
  NodeEnv,
} from '@/infrastructure/config/types/config.interface';
import { ACCESS_TOKEN_NAME } from '@/infrastructure/web-server/constants';
import { ICreateUserCase } from '@/domain/users/types/create-user-case.interface';
import { ICreateTokenByCredentialsCase } from '@/domain/users/types/create-token-by-credentials-case.interface';
import {
  Body,
  Controller,
  Handler,
  HandlerMeta,
  Response,
} from '@/infrastructure/web-server/controllers-definition/decorators';
import { userLoginTakenApiErrorSchema } from '@/domain/users/errors/user-login-taken.error';
import { userWrongPasswordApiErrorSchema } from '@/domain/users/errors/user-wrong-password.error';
import { userNotFoundApiErrorSchema } from '@/domain/users/errors/user-not-found.error';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly config: IConfig,
    private readonly createUserCase: ICreateUserCase,
    private readonly createTokenByCredentialsCase: ICreateTokenByCredentialsCase,
  ) {}

  @Handler('POST')
  @HandlerMeta({
    summary: 'Create user',
  })
  @Body(createUserSchema)
  @Response(204, '')
  @Response(400, userLoginTakenApiErrorSchema)
  async createUser(event: H3Event) {
    const body = await readValidatedBody(event, createUserSchema.parse);

    const token = await this.createUserCase.execute({
      login: body.login,
      password: body.password,
    });

    this.setAccessTokenCookie(event, token);

    setResponseStatus(event, 204);
    return null;
  }

  @Handler('POST', '/session')
  @HandlerMeta({
    summary: 'Login',
  })
  @Body(loginUserSchema)
  @Response(204, '')
  @Response(400, userWrongPasswordApiErrorSchema.or(userNotFoundApiErrorSchema))
  async login(event: H3Event) {
    const credentials = await readValidatedBody(event, loginUserSchema.parse);
    const token = await this.createTokenByCredentialsCase.execute(credentials);

    this.setAccessTokenCookie(event, token);

    setResponseStatus(event, 204);
    return null;
  }

  @Handler('DELETE', '/session')
  @HandlerMeta({
    summary: 'Logout',
  })
  @Response(204, '')
  async logout(event: H3Event) {
    this.setAccessTokenCookie(event, '');

    setResponseStatus(event, 204);
    return null;
  }

  private setAccessTokenCookie(event: H3Event, accessToken: string): void {
    setCookie(event, ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: this.config.nodeEnv === NodeEnv.PRODUCTION,
    });
  }
}

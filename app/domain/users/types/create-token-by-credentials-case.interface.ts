import { UserCredentials } from '@/domain/users/types/shared';

export interface ICreateTokenByCredentialsCase {
  execute(credentials: UserCredentials): Promise<string>;
}

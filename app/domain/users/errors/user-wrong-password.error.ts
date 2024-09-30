import { defineError } from '@/common/errors/define-error';

export const [UserWrongPasswordError, userWrongPasswordApiErrorSchema] =
  defineError('USER_WRONG_PASSWORD');

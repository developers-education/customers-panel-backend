import { defineError } from '@/common/errors/define-error';

export const [UserNotFoundError, userNotFoundApiErrorSchema] =
  defineError('USER_NOT_FOUND');

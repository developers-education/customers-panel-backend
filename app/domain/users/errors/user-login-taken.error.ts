import { z } from 'zod';
import { defineError } from '@/common/errors/define-error';

export const [UserLoginTakenError, userLoginTakenApiErrorSchema] = defineError<{
  login: string;
}>(
  'LOGIN_TAKEN',
  z.object({
    login: z.string(),
  }),
);

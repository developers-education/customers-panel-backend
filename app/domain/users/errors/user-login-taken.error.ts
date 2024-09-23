import { AppError } from '@/common/errors/app-error';
import { errorSchema } from '@/common/schemas/error.schema';
import { z } from 'zod';

const NAME = 'LOGIN_TAKEN';

interface Data {
  login: string;
}

export class UserLoginTakenError extends AppError {
  constructor(data: Data) {
    super(NAME, data);
  }
}

export const userLoginTakenErrorSchema = errorSchema.extend({
  statusMessage: z.literal(NAME),
  data: z.object({
    login: z.string(),
  }),
});

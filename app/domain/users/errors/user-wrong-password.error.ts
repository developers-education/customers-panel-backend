import { AppError } from '@/common/errors/app-error';
import { errorSchema } from '@/common/schemas/error.schema';
import { z } from 'zod';

const NAME = 'USER_WRONG_PASSWORD';

export class UserWrongPasswordError extends AppError {
  constructor() {
    super(NAME);
  }
}

export const userWrongPasswordErrorSchema = errorSchema.extend({
  statusMessage: z.literal(NAME),
});

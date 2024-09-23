import { AppError } from '@/common/errors/app-error';
import { errorSchema } from '@/common/schemas/error.schema';
import { z } from 'zod';

const NAME = 'USER_NOT_FOUND';

export class UserNotFoundError extends AppError {
  constructor() {
    super(NAME);
  }
}

export const userNotFoundErrorSchema = errorSchema.extend({
  statusMessage: z.literal(NAME),
});

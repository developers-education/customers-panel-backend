import { AppError } from '@/common/errors/app-error';
import { errorSchema } from '@/common/schemas/error.schema';
import { z } from 'zod';

const NAME = 'CUSTOMER_NOT_FOUND';

export class CustomerNotFoundError extends AppError {
  constructor() {
    super(NAME);
  }
}

export const customerNotFoundErrorSchema = errorSchema.extend({
  statusMessage: z.literal(NAME),
});

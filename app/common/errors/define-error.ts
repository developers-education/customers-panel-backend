import { z, ZodSchema } from 'zod';
import { AppError } from '@/common/errors/app-error';
import { apiErrorSchema } from '@/common/errors/api-error.schema';

export function defineError<Params = undefined>(
  name: string,
  dataSchema?: ZodSchema,
): [typeof errorClass, ErrorApiSchema] {
  const errorClass = class extends AppError {
    constructor(params?: Params) {
      super(name, params ?? {});
    }
  };

  const errorApiSchema = apiErrorSchema.extend({
    statusMessage: z.literal(name),
    data: dataSchema ?? z.object({}),
  });

  return [errorClass, errorApiSchema];
}

type ErrorApiSchema = ZodSchema;

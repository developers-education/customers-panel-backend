import { z } from 'zod';

export const errorSchema = z.object({
  statusCode: z.number(),
  statusMessage: z.string(),
  data: z.object({}),
});

import { z } from 'zod';

export const loginUserSchema = z.object({
  login: z.string().max(255).min(1),
  password: z.string().max(255).min(1),
});

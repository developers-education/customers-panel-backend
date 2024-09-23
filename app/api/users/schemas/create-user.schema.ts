import { z } from 'zod';

export const createUserSchema = z.object({
  login: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/gm)
    .min(4)
    .max(32)
    .trim()
    .openapi({ example: 'siran' }),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9@$%&_]*$/gm)
    .min(8)
    .max(64)
    .trim()
    .openapi({ example: 'qwerty12345' }),
});

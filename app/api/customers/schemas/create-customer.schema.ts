import { z } from 'zod';

export const createCustomerSchema = z.object({
  firstName: z
    .string()
    .regex(/[a-zA-Z-]*/g)
    .min(2)
    .max(128)
    .trim()
    .openapi({ example: 'Dmitriy' }),
  lastName: z
    .string()
    .regex(/[a-zA-Z-]*/g)
    .min(2)
    .max(128)
    .trim()
    .openapi({ example: 'Sienduk' }),
  idNumber: z
    .string()
    .regex(/[0-9]*/g)
    .length(10)
    .trim(),
  birthDate: z.string().date(),
  phone: z
    .string()
    .regex(/[0-9]*/g)
    .min(10)
    .max(16)
    .optional()
    .openapi({ example: '71234562323' }),
  email: z.string().email(),
});

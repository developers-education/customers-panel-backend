import { z } from 'zod';

export const updateCustomerSchema = z.object({
  firstName: z
    .string()
    .regex(/^[a-zA-Z-]*$/gm)
    .min(2)
    .max(128)
    .trim()
    .optional()
    .openapi({ example: 'Dmitriy' }),
  lastName: z
    .string()
    .regex(/^[a-zA-Z-]*$/gm)
    .min(2)
    .max(128)
    .trim()
    .optional()
    .openapi({ example: 'Sienduk' }),
  idNumber: z
    .string()
    .regex(/^[0-9]*$/gm)
    .length(10)
    .trim()
    .optional(),
  birthDate: z.string().date().optional(),
  phone: z
    .string()
    .regex(/^[0-9]*%/gm)
    .min(10)
    .max(16)
    .optional()
    .openapi({ example: '71234562323' }),
  email: z.string().email().optional(),
});

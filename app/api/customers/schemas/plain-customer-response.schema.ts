import { z } from 'zod';

export const plainCustomerResponseSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().openapi({ example: 'Dmitriy' }),
  lastName: z.string().openapi({ example: 'Sienduk' }),
  idNumber: z.string(),
  birthDate: z.date(),
  phone: z.string().optional().openapi({ example: '71234562323' }),
  email: z.string().email(),
});

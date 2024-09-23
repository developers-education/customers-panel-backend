import { z } from 'zod';
import { plainCustomerResponseSchema } from '@/api/customers/schemas/plain-customer-response.schema';

export const customersWithPagesResponseSchema = z.object({
  customers: z.array(plainCustomerResponseSchema),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

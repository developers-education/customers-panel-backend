import { CustomerPlain } from '@/domain/customers/entities/customer.entity';

export interface IGetCustomersWithPagesCase {
  execute(pagination?: GetCustomersWithPagesPagination): Promise<GetCustomersWithPagesResult>;
}

export type GetCustomersWithPagesResult = {
  customers: CustomerPlain[];
  page: number;
  limit: number;
  totalPages: number;
};

export type GetCustomersWithPagesPagination = {
  page?: number;
  limit?: number;
};

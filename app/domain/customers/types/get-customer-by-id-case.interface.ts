import { CustomerPlain } from '@/domain/customers/entities/customer.entity';

export interface IGetCustomerByIdCase {
  execute(userId: string, id: string): Promise<CustomerPlain>;
}

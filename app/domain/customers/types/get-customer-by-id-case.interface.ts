import { CustomerPlain } from '@/domain/customers/entities/customer.entity';

export interface IGetCustomerByIdCase {
  execute(id: string): Promise<CustomerPlain>;
}

import { Customer } from '@/domain/customers/entities/customer.entity';

export interface ICustomersRepository {
  saveCustomer(customer: Customer): Promise<Customer>;
  getCustomer(id: string): Promise<Customer | null>;
  getCustomers(params?: GetCustomersParams): Promise<Customer[]>;
  countCustomers(): Promise<number>;
  deleteCustomer(id: string): Promise<void>;
}

type GetCustomersParams = {
  limit?: number;
  offset?: number;
};

import {
  CreateCustomerParams,
  ICreateCustomerCase,
} from '@/domain/customers/types/create-customer-case.interface';
import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { ICustomersRepository } from '@/domain/customers/types/customers-repository.interface';
import { Customer } from '@/domain/customers/entities/customer.entity';

export class CreateCustomerCase implements ICreateCustomerCase {
  constructor(
    private readonly logger: ILogger,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(
    userId: string,
    params: CreateCustomerParams,
  ): Promise<void> {
    this.logger.info('Starting customer creating.', { params });

    const customer = new Customer({ userId, ...params });
    await this.customersRepository.saveCustomer(customer);

    this.logger.info('Customer successfully created.', { id: customer.id });
  }
}

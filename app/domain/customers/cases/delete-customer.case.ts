import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { ICustomersRepository } from '@/domain/customers/types/customers-repository.interface';
import { IDeleteCustomerCase } from '@/domain/customers/types/delete-customer-case.interface';
import { CustomerNotFoundError } from '@/domain/customers/errors/customer-not-found.error';

export class DeleteCustomerCase implements IDeleteCustomerCase {
  constructor(
    private readonly logger: ILogger,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    this.logger.info('Starting customer deleting.', { id });

    const customer = await this.customersRepository.getCustomerById(id);
    if (!customer) {
      throw new CustomerNotFoundError();
    }

    await this.customersRepository.deleteCustomer(customer.id);

    this.logger.info('Customer successfully deleted.', { id });
  }
}

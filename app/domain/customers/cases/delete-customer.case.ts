import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { ICustomersRepository } from '@/domain/customers/types/customers-repository.interface';
import { IDeleteCustomerCase } from '@/domain/customers/types/delete-customer-case.interface';

export class DeleteCustomerCase implements IDeleteCustomerCase {
  constructor(
    private readonly logger: ILogger,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    this.logger.info('Starting customer deleting.', { id });

    const customer = await this.customersRepository.getCustomer(id);
    if (!customer) {
      throw new Error(); // TODO
    }

    await this.customersRepository.deleteCustomer(customer.id);

    this.logger.info('Customer successfully deleted.', { id });
  }
}

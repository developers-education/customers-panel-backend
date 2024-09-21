import { IGetCustomerByIdCase } from '@/domain/customers/types/get-customer-by-id-case.interface';
import { CustomerPlain } from '@/domain/customers/entities/customer.entity';
import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { ICustomersRepository } from '@/domain/customers/types/customers-repository.interface';

export class GetCustomerByIdCase implements IGetCustomerByIdCase {
  constructor(
    private readonly logger: ILogger,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string): Promise<CustomerPlain> {
    this.logger.info('Starting getting customer by id.', { id });

    const customer = await this.customersRepository.getCustomer(id);
    if (!customer) {
      throw new Error(); // TODO
    }

    const plain = customer.toPlain();

    this.logger.info('Successfully got customer by id.', { id });

    return plain;
  }
}

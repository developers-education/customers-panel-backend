import { IGetCustomerByIdCase } from '@/domain/customers/types/get-customer-by-id-case.interface';
import { CustomerPlain } from '@/domain/customers/entities/customer.entity';
import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { ICustomersRepository } from '@/domain/customers/types/customers-repository.interface';
import { CustomerNotFoundError } from '@/domain/customers/errors/customer-not-found.error';

export class GetCustomerByIdCase implements IGetCustomerByIdCase {
  constructor(
    private readonly logger: ILogger,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(userId: string, id: string): Promise<CustomerPlain> {
    this.logger.info('Starting getting customer by id.', { id });

    const customer = await this.customersRepository.getCustomerById(id);
    if (!customer || customer.userId !== userId) {
      throw new CustomerNotFoundError();
    }

    const plain = customer.toPlain();

    this.logger.info('Successfully got customer by id.', { id });

    return plain;
  }
}

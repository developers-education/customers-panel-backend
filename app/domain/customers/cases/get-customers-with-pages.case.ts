import {
  GetCustomersWithPagesPagination,
  GetCustomersWithPagesResult,
  IGetCustomersWithPagesCase,
} from '@/domain/customers/types/get-customers-with-pages-case.interface';
import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { ICustomersRepository } from '@/domain/customers/types/customers-repository.interface';
import { Customer } from '@/domain/customers/entities/customer.entity';

export class GetCustomersWithPagesCase implements IGetCustomersWithPagesCase {
  constructor(
    private readonly logger: ILogger,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(
    pagination: GetCustomersWithPagesPagination = {},
  ): Promise<GetCustomersWithPagesResult> {
    const limit = pagination.limit ?? 10;
    const page = pagination.page ?? 1;

    this.logger.info('Starting getting customers with pages.', { limit, page });

    const customers = await this.customersRepository.getCustomers({
      limit,
      offset: (page - 1) * limit,
    });

    this.logger.info('Got customers.', { amount: customers.length });

    const totalCustomers = await this.customersRepository.countCustomers();

    this.logger.info('Got total customers.', { total: totalCustomers });

    const result = this.getResult(customers, page, limit, totalCustomers);

    this.logger.info('Successfully got customers with pages.', { ...result });

    return result;
  }

  private getResult(
    customers: Customer[],
    page: number,
    limit: number,
    totalCustomers: number,
  ): GetCustomersWithPagesResult {
    return {
      customers: customers.map((customer) => customer.toPlain()),
      page,
      limit,
      totalPages: Math.ceil(totalCustomers / limit),
    };
  }
}

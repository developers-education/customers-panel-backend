import {
  GetCustomersParams,
  ICustomersRepository,
} from '@/domain/customers/types/customers-repository.interface';
import { Customer } from '@/domain/customers/entities/customer.entity';
import { IAppDatabase } from '@/infrastructure/app-database/database';

export class CustomersRepository implements ICustomersRepository {
  constructor(private readonly db: IAppDatabase) {}

  public async countCustomers(): Promise<number> {
    const result = await this.db
      .selectFrom('customer')
      .select([(b) => b.fn.count('id').as('total')])
      .executeTakeFirst();
    return Number(result!.total);
  }

  public async deleteCustomer(id: string): Promise<void> {
    await this.db.deleteFrom('customer').where('id', '=', id).execute();
  }

  public async getCustomerById(id: string): Promise<Customer | null> {
    const result = await this.db
      .selectFrom('customer')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    return result ? new Customer(result) : null;
  }

  public async getCustomers(params?: GetCustomersParams): Promise<Customer[]> {
    let builder = this.db.selectFrom('customer').selectAll();
    if (params?.limit !== undefined) {
      builder = builder.limit(params.limit);
    }
    if (params?.offset !== undefined) {
      builder = builder.offset(params.offset);
    }
    const result = await builder.execute();
    return result.map((data) => new Customer(data));
  }

  public async saveCustomer(customer: Customer): Promise<Customer> {
    const data = {
      ...customer.toPlain(),
      birthDate: customer.birthDate.toDateString(),
    };

    const existing = await this.getCustomerById(customer.id);
    if (existing) {
      const { id, ...toUpdate } = data;
      const result = await this.db
        .updateTable('customer')
        .set(toUpdate)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow();

      return new Customer(result);
    }

    const result = await this.db
      .insertInto('customer')
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new Customer(result);
  }
}

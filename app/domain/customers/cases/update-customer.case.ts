import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { ICustomersRepository } from '@/domain/customers/types/customers-repository.interface';
import {
  IUpdateCustomerCase,
  UpdateCustomerData,
} from '@/domain/customers/types/update-customer-case.interface';
import { Customer } from '@/domain/customers/entities/customer.entity';

export class UpdateCustomerCase implements IUpdateCustomerCase {
  constructor(
    private readonly logger: ILogger,
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string, data: UpdateCustomerData): Promise<void> {
    this.logger.info('Starting customer updating.', { id, data });

    const customer = await this.customersRepository.getCustomerById(id);
    if (!customer) {
      throw new Error(); // TODO
    }

    this.updateCustomerFields(customer, data);

    await this.customersRepository.saveCustomer(customer);

    this.logger.info('Customer successfully updated.', { id });
  }

  private updateCustomerFields(customer: Customer, data: UpdateCustomerData): void {
    if (data.firstName !== undefined) {
      customer.firstName = data.firstName;
    }

    if (data.lastName !== undefined) {
      customer.lastName = data.lastName;
    }

    if (data.idNumber !== undefined) {
      customer.idNumber = data.idNumber;
    }

    if (data.birthDate !== undefined) {
      customer.birthDate = data.birthDate;
    }

    if (data.email !== undefined) {
      customer.email = data.email;
    }

    if (data.phone !== undefined) {
      customer.phone = data.phone;
    }
  }
}

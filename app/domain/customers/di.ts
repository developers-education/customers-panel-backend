import { appDi } from '@/infrastructure/ioc-container';
import { asClass, Resolver } from 'awilix';
import { CustomersRepository } from '@/domain/customers/repositories/customers.repository';
import { ICustomersRepository } from '@/domain/customers/types/customers-repository.interface';
import { CreateCustomerCase } from '@/domain/customers/cases/create-customer.case';
import { ICreateCustomerCase } from '@/domain/customers/types/create-customer-case.interface';
import { GetCustomerByIdCase } from '@/domain/customers/cases/get-customer-by-id.case';
import { IGetCustomerByIdCase } from '@/domain/customers/types/get-customer-by-id-case.interface';
import { GetCustomersWithPagesCase } from '@/domain/customers/cases/get-customers-with-pages.case';
import { IGetCustomersWithPagesCase } from '@/domain/customers/types/get-customers-with-pages-case.interface';
import { UpdateCustomerCase } from '@/domain/customers/cases/update-customer.case';
import { IUpdateCustomerCase } from '@/domain/customers/types/update-customer-case.interface';
import { DeleteCustomerCase } from '@/domain/customers/cases/delete-customer.case';
import { IDeleteCustomerCase } from '@/domain/customers/types/delete-customer-case.interface';

appDi.register({
  customersRepository: asClass(
    CustomersRepository,
  ).singleton() satisfies Resolver<ICustomersRepository>,
  createCustomerCase: asClass(
    CreateCustomerCase,
  ).singleton() satisfies Resolver<ICreateCustomerCase>,
  getCustomerByIdCase: asClass(
    GetCustomerByIdCase,
  ).singleton() satisfies Resolver<IGetCustomerByIdCase>,
  getCustomersWithPagesCase: asClass(
    GetCustomersWithPagesCase,
  ).singleton() satisfies Resolver<IGetCustomersWithPagesCase>,
  updateCustomerCase: asClass(
    UpdateCustomerCase,
  ).singleton() satisfies Resolver<IUpdateCustomerCase>,
  deleteCustomerCase: asClass(
    DeleteCustomerCase,
  ).singleton() satisfies Resolver<IDeleteCustomerCase>,
});

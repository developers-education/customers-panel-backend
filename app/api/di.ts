import { asClass } from 'awilix';
import { appDi } from '@/infrastructure/ioc-container';
import { UsersController } from '@/api/users/users.controller';
import { CustomersController } from '@/api/customers/customers.controller';

appDi.register({
  usersController: asClass(UsersController).singleton(),
  customersController: asClass(CustomersController).singleton(),
});

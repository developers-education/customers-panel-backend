import { asClass } from 'awilix';
import { appDi } from '@/infrastructure/ioc-container';
import { UsersController } from '@/api/users/controller';

appDi.register({
  usersController: asClass(UsersController).singleton(),
});

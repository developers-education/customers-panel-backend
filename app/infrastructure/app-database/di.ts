import { asFunction, Resolver } from 'awilix';
import { appDi } from '@/infrastructure/ioc-container';
import { IAppDatabase, makeAppDatabase } from '@/infrastructure/app-database/database';
import { makeMigrator } from '@/infrastructure/app-database/migrator/make-migrator';
import { IMigrator } from '@/infrastructure/app-database/migrator/types';

appDi.register({
  db: asFunction(makeAppDatabase).singleton() satisfies Resolver<IAppDatabase>,
  migrator: asFunction(makeMigrator).singleton() satisfies Resolver<IMigrator>,
});

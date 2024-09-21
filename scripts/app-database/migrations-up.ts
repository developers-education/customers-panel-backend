import 'zod-openapi/extend';
import '@/di';
import { appDi } from '@/infrastructure/ioc-container';
import { IMigrator } from '@/infrastructure/app-database/migrator/types';

const migrator = appDi.resolve<IMigrator>('migrator');
await migrator.up();

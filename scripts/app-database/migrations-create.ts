import 'zod-openapi/extend';
import '@/di';
import { askQuestion } from '@/common/utils/cli';
import { appDi } from '@/infrastructure/ioc-container';
import { IMigrator } from '@/infrastructure/app-database/migrator/types';

const migrator = appDi.resolve<IMigrator>('migrator');
const title = await askQuestion('Enter migration title: ');
await migrator.createFiles(title);

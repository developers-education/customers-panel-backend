import SQLite from 'better-sqlite3';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import { UserTable } from '@/infrastructure/app-database/tables/user.table';
import { MigrationTable } from '@/infrastructure/app-database/tables/migration.table';
import { CustomerTable } from '@/infrastructure/app-database/tables/customer.table';

interface Database {
  user: UserTable;
  customer: CustomerTable;
  __migration: MigrationTable;
}
export type IAppDatabase = Kysely<Database>;

export function makeAppDatabase(): IAppDatabase {
  return new Kysely({
    dialect: new SqliteDialect({
      database: new SQLite('db/app.db'),
    }),
    plugins: [
      new CamelCasePlugin({
        underscoreBeforeDigits: true,
      }),
    ],
  });
}

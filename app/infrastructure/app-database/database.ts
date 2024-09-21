import SQLite from 'better-sqlite3';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import { UserTable } from '@/infrastructure/app-database/tables/user.table';
import { InvalidRefreshTokenTable } from '@/infrastructure/app-database/tables/invalid-refresh-token.table';
import { MigrationTable } from '@/infrastructure/app-database/tables/migration.table';

interface Database {
  user: UserTable;
  invalidRefreshToken: InvalidRefreshTokenTable;
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

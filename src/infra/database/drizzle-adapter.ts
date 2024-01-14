import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres, { Sql } from 'postgres';
import * as schema from '../../../drizzle/schema';

export default class DrizzleAdapter {
  connection: PostgresJsDatabase<Record<string, string>>
  sql: postgres.Sql<{}>

  constructor() {
    const url = process.env.DATABASE_URL as string
    this.sql = postgres(url);
  }

  connect() {
    this.connection = drizzle(this.sql, { schema });
    return this.connection
  }

  //async end() {
  //  await this.sql.end()
  //}
}
import 'dotenv/config'
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL as string
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

async function main() {
  const connection = postgres(DATABASE_URL, { max: 1 })
  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: "drizzle/migrations" });
  await connection.end();
  console.log("migração efetuada!")
  process.exit()
}

main().catch((error) => {
  console.log(error)
  process.exit()
});
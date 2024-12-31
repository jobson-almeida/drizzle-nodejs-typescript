import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema/index.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  verbose: true,
  strict: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string
  },
} satisfies Config;
import { drizzle } from "drizzle-orm/bun-sqlite";
import { sqlite } from "./sqlite";
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

const db = drizzle(sqlite, { casing: "snake_case", });

migrate( db, { migrationsFolder: './src/db/migrations' });

export { db }
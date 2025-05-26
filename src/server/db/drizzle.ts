import { drizzle } from "drizzle-orm/bun-sqlite"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"
import { sqlite } from "./sqlite"

const db = drizzle(sqlite, { casing: "snake_case" })

migrate(db, { migrationsFolder: "./src/server/db/migrations" })

export { db }

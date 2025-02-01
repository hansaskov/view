import type { Config } from "drizzle-kit"
import { getSqlitePath } from "./src/config/enviroment"

const SQLITE_PATH = getSqlitePath()

export default {
  schema: "./src/collection/**/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  casing: "snake_case",
  dbCredentials: {
    url: SQLITE_PATH
  }
} satisfies Config
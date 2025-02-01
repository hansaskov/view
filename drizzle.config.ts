import type { Config } from "drizzle-kit"

const SQLITE = process.env.SQLITE ?? "sqlite.db"

export default {
  schema: "./src/collection/**/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  casing: "snake_case",
  dbCredentials: {
    url: `file:./${SQLITE}`
  }
} satisfies Config
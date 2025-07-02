import type { Config } from "drizzle-kit"
import { getSqlitePath } from "./src/common/utils/path"

const SQLITE_PATH = getSqlitePath({
	dataPath: process.env.DATA_PATH ?? "./data",
	sqlite: process.env.SQLITE ?? "sqlite.db",
})

export default {
	schema: "./src/server/collections/**/table.ts",
	out: "./src/server/migrations",
	dialect: "sqlite",
	casing: "snake_case",
	dbCredentials: {
		url: SQLITE_PATH,
	},
} satisfies Config

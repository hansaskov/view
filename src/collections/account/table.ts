import { randomUUID } from "node:crypto"
import { table as users } from "@/collections/user/table" // drizzle-kit still does not support esm
import { sql } from "drizzle-orm"
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

const TABLE_NAME = "account"

export const table = sqliteTable(
	TABLE_NAME,
	{
		id: text().primaryKey().$defaultFn(randomUUID),
		userId: text()
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		accountId: text().notNull(),
		providerId: text().notNull(),
		accessToken: text(),
		refreshToken: text(),
		accessTokenExpiresAt: integer({ mode: "timestamp" }),
		refreshTokenExpiresAt: integer({ mode: "timestamp" }),
		scope: text(),
		idToken: text(),
		password: text(),
		createdAt: integer({ mode: "timestamp" })
			.notNull()
			.$defaultFn(() => new Date()),
		updatedAt: integer({ mode: "timestamp" })
			.notNull()
			.$defaultFn(() => new Date())
			.$onUpdateFn(() => new Date()),
	},
	table => [index("idx_account_lookup").on(table.userId)]
)

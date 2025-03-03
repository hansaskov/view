import { randomUUID } from "node:crypto"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

const TABLE_NAME = "verification"

export const table = sqliteTable(TABLE_NAME, {
	id: text().primaryKey().$defaultFn(randomUUID),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer({ mode: "timestamp" }).notNull(),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer({ mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
})

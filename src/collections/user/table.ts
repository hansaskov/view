import { randomUUID } from "node:crypto"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

const TABLE_NAME = "user"
const ROLES = ["user", "admin"] as const

export const table = sqliteTable(TABLE_NAME, {
	id: text().primaryKey().$defaultFn(randomUUID),
	name: text().notNull(),
	email: text().unique().notNull(),
	emailVerified: integer({ mode: "boolean" }).notNull().default(false),
	image: text(),
	isAnonymous: integer({ mode: "boolean" }).notNull().default(false),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer({ mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
})

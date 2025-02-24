import { randomUUID } from "node:crypto"
import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

const TABLE_NAME = "user"
const ROLES = ["user", "admin"] as const

export const table = sqliteTable(TABLE_NAME, {
	id: text().primaryKey().$defaultFn(randomUUID),
	name: text().notNull(),
	email: text().unique().notNull(),
	emailVerified: integer({ mode: "boolean" }).notNull().default(false),
	image: text(),
	role: text({ enum: ROLES }).notNull().default("user"),
	banned: integer({ mode: "boolean" }).notNull().default(false),
	banReason: text(),
	banExpires: integer({ mode: "timestamp_ms" }),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(() => sql`(current_timestamp)`),
	updatedAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(() => sql`(current_timestamp)`)
		.$onUpdate(() => sql`(current_timestamp)`),
})

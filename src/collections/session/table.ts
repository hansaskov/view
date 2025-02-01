import { randomUUID } from "node:crypto";
import users from "$collections/users";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const TABLE_NAME = "session";

export const table = sqliteTable(TABLE_NAME, {
	id: text().primaryKey().$defaultFn(randomUUID),
	userId: text()
		.notNull()
		.references(() => users.table.id, { onDelete: "cascade" }),
	token: text().notNull(),
	expiresAt: integer({ mode: "timestamp" }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(() => sql`(current_timestamp)`),
	updatedAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(() => sql`(current_timestamp)`)
		.$onUpdate(() => sql`(current_timestamp)`),
});

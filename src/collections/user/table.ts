import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text().primaryKey().$defaultFn(randomUUID),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer({ mode: "boolean" }).notNull().default(false),
	image: text(),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(() => sql`(current_timestamp)`),
	updatedAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(() => sql`(current_timestamp)`)
		.$onUpdate(() => sql`(current_timestamp)`),
});

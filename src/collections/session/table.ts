import { randomUUID } from "node:crypto";
import { users } from "$collections/user/table";
import { currentTimestamp } from "$db/sql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const session = sqliteTable("session", {
	id: text().primaryKey().$defaultFn(randomUUID),
	userId: text()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	token: text().notNull(),
	expiresAt: integer({ mode: "timestamp" }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(currentTimestamp),
	updatedAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(currentTimestamp)
		.$onUpdate(currentTimestamp),
});

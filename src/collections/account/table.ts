import { randomUUID } from "node:crypto";
import { table as users } from "$collections/users/table";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const TABLE_NAME = "account";

export const table = sqliteTable(TABLE_NAME, {
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
		.$default(() => sql`(current_timestamp)`),
	updatedAt: integer({ mode: "timestamp" })
		.notNull()
		.$default(() => sql`(current_timestamp)`)
		.$onUpdate(() => sql`(current_timestamp)`),
});

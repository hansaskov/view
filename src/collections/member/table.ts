import { randomUUID } from "node:crypto"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { table as organization } from "../organization/table"
import { table as user } from "../user/table"

const TABLE_NAME = "invitation"

export const table = sqliteTable(TABLE_NAME, {
	id: text().primaryKey().$defaultFn(randomUUID),
	email: text().notNull(),
	inviterId: text()
		.notNull()
		.references(() => user.id),
	organizationId: text()
		.notNull()
		.references(() => organization.id),
	role: text(),
	status: text(),
	expiresAt: integer({ mode: "timestamp" }).notNull(),
	createdAt: integer({ mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer({ mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
})

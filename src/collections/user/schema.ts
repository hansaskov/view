import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-typebox"
import { t } from "elysia"
import { table } from "./table"

export const select = createSelectSchema(table, {
	id: schema => t.String({ ...schema, format: "uuid" }),
	name: schema => t.String({ ...schema, minLength: 1, maxLength: 100 }),
	email: schema => t.String({ ...schema, format: "email" }),
})

export const insert = createInsertSchema(table, {
	id: schema => t.String({ ...schema, format: "uuid" }),
	name: schema => t.String({ ...schema, minLength: 1, maxLength: 100 }),
	email: schema => t.String({ ...schema, format: "email" }),
})

export const update = createUpdateSchema(table, {
	id: schema => t.String({ ...schema, format: "uuid" }),
	name: schema => t.String({ ...schema, minLength: 1, maxLength: 100 }),
	email: schema => t.String({ ...schema, format: "email" }),
})

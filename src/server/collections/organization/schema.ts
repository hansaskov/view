import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-typebox"
import { t } from "elysia"
import { table } from "./table"

export const select = createSelectSchema(table, {
	id: schema => t.String({ ...schema, format: "uuid" }),
})

export const insert = createInsertSchema(table)

export const update = createUpdateSchema(table)

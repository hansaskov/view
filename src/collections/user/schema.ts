import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-typebox"
import { table } from "./table"

export const select = createSelectSchema(table)

export const insert = createInsertSchema(table)

export const update = createUpdateSchema(table)

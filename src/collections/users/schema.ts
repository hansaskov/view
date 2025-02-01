import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";
import { table } from "./table";

export const insert = createInsertSchema(table, {
	id: schema => t.String({ ...schema, format: "uuid" }),
	name: schema => t.String({ ...schema, minLength: 1, maxLength: 100 }),
	email: schema => t.String({ ...schema, format: "email" }),
});

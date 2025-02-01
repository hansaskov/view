import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";
import { table } from "./table";

export const insert = createInsertSchema(table, {
	id: schema => t.String({ ...schema, format: "uuid" }),
	userId: schema => t.String({ ...schema, format: "uuid" }),
});

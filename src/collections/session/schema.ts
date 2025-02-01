import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";
import { session } from "./table";

export const userCreateSchema = createInsertSchema(session, {
	id: schema => t.String({ ...schema, format: "uuid" }),
	userId: schema => t.String({ ...schema, format: "uuid" }),
});

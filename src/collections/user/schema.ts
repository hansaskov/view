import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";
import { users } from "./table";

export const schema = createInsertSchema(users, {
	id: schema => t.String({ ...schema, format: "uuid" }),
	name: schema => t.String({ ...schema, minLength: 1, maxLength: 100 }),
	email: schema => t.String({ ...schema, format: "email" }),
});

import { Elysia } from "elysia";
import { users } from "./collections/user/schema";
import { db } from "./db/drizzle";

await db.insert(users).values({
	name: "Hans",
	email: "hans@askov.dk",
	emailVerified: true,
});

export const app = new Elysia().get("/", () => "Hello world");

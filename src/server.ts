import { session } from "$collections/session";
import { create } from "$collections/user/query";
import { Elysia } from "elysia";
import { users } from "./collections/user/table";
import { db } from "./db/drizzle";

const hans = await create({
	name: "Hans",
	email: "hans@askov.dk",
	emailVerified: true,
});

export const app = new Elysia().get("/", () => "Hello world");

session.queries.create({
	expiresAt: new Date(),
	token: "aldlasdj",
	userId: hans.id,
});

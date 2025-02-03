import { type User, users } from "$collections/users";
import { Elysia } from "elysia";
import homepage from "./pages/index.html";

export const app = new Elysia()
	.get("/", homepage)
	.get("/users", async () => await users.queries.selectAll())
	.get(
		"/hans",
		async () =>
			await users.queries.insert({ name: "hans", email: "hans@asov.dk" }),
	);

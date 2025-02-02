import { users, type User } from "$collections/users";
import { Elysia } from "elysia";

export const app = new Elysia()
	.get("/", () => "Hello world")
	.get("/users", async () => await users.queries.selectAll())
	.get(
		"/hans",
		async () =>
			await users.queries.insert({ name: "hans", email: "hans@asov.dk" }),
	);

const hans: User = await users.queries.selectFirst();

console.log(hans);

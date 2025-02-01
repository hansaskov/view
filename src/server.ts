import { Elysia } from "elysia";
import { db } from "./db/drizzle"
import { users } from "./collections/user/schema";

await db.insert(users).values({
    name: "Hans",
    email: "hans@askov.dk",
    emailVerified: true
})

export const app = new Elysia().get("/", () => "Hello world");


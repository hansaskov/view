import { Elysia } from "elysia";
import { db } from "./db/drizzle"
import { users } from "./collection/user/schema";

db.insert(users).values({
    id: "1",
    name: "Hans",
    email: "hans@askov.dk",
    emailVerified: true
})

export const app = new Elysia().get("/", () => "Hello world");


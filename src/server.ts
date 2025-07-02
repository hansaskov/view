import client from "@client/index.html" with { type: "embed" }
import { api } from "@server/api"
import { Elysia } from "elysia"
import { auth } from "./server/auth/better-auth"

export const server = new Elysia()
	.mount(auth.handler)
	.use(api)

	// Public Routes
	.get("/", client)
	.get("/docs", client)
	.get("/login", client)
	.get("/sign-in", client)
	.get("/forgot-password", client)

	// Protected Routes
	.get("/photos", client)
	.get("/files", client)
	.get("/movies", client)
	.get("/shows", client)
	.get("/metadata", client)

	// Protected Admin Routes
	.get("/users", client)
	.get("/log", client)
	.get("/api-keys", client)
	.get("/settings", client)

export type App = typeof server

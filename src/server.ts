import { Elysia } from "elysia"
import { publicApi } from "./api/public"
import betterAuthView from "./auth/auth-view"
import { auth } from "./auth/better-auth"
import client from "./index.html" with { type: "embed" }
import { logger } from "./utils/logger"

const api = new Elysia({ prefix: "/api" })
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/names", ["Jack", "Jill", "Jones"])

export const server = new Elysia()
	.use(api)
	.use(publicApi)
	.all("/api/auth/*", betterAuthView)

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

import client from "@client/index.html" with { type: "embed" }
import { publicApi } from "@server/api/public"
import { Elysia } from "elysia"
import { logger } from "./common/utils/logger"
import { auth } from "./server/auth/better-auth"

const api = new Elysia({ prefix: "/api" })
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/names", ["Jack", "Jill", "Jones"])

export const server = new Elysia({
	aot: true,
})
	.mount(auth.handler)
	.use(api)
	.use(publicApi)
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

import { Elysia } from "elysia"
import { auth } from "./auth/better-auth"
import client from "./index.html"
import { logger } from "./utils/logger"

const api = new Elysia({ prefix: "/api" })
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/names", ["Jack", "Jill", "Jones"])

export const server = new Elysia()
	.mount(auth.handler)
	.use(api)
	.get("/", client)
	.get("/login", client)
	.get("/devices", client)
	.get("/log", client)
	.get("/metadata", client)
	.get("/movies", client)
	.get("/photos", client)
	.get("/sessions", client)
	.get("/settings", client)
	.get("/shows", client)
	.get("/users", client)
	.get("/docs", client)
	.get("/forgot-password", client)
	.get("/login", client)
	.get("/posts/*", client)
	.get("/sign-up", client)
	.get("/sign-in", client)
	.get("/payment", client)

export type App = typeof server

import { Elysia } from "elysia"
import { auth } from "./auth/better-auth"
import react from "./index.html"
import { logger } from "./utils/logger"

const api = new Elysia({ prefix: "/api" })
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/names", ["Jack", "Jill", "Jones"])
	.as("global")

export const server = new Elysia()
	.mount(auth.handler)
	.use(api)
	.get("/", react)
	.get("/movies", react)
	.get("/posts/:id", react)

export type App = typeof server

import { Elysia } from "elysia"
import { auth } from "./auth/better-auth"
import react from "./index.html"
import { logger } from "./utils/logger"
export const server = new Elysia()
	.mount(auth.handler)
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/", react)
	.get("/api/names", ["Jack", "Jill", "Jones"])

export type App = typeof server

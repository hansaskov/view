import { Elysia } from "elysia"
import react from "./app/index.html"
import { betterAuthHandler } from "./auth/better-auth"
import { logger } from "./utils/logger"
export const server = new Elysia()
	.use(betterAuthHandler)
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/favicon.ico", Bun.file("./public/favicon.ico"))
	.get("/", react)
	.get("/api/names", ["Jack", "Jill", "Jones"])

export type App = typeof server

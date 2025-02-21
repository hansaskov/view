import { Elysia } from "elysia"
import react from "./app/index.html"
import { logger } from "./utils/logger"
import { auth } from "./auth/better-auth"
export const server = new Elysia()
	.mount(auth.handler)
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/favicon.ico", Bun.file("./public/favicon.ico"))
	.get("/", react)
	.get("/api/names", ["Jack", "Jill", "Jones"])

export type App = typeof server

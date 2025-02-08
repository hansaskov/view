import { Elysia } from "elysia"
import react from "./app/index.html"
import login from "./app/html/login.html"
import Login from "./app/login.tsx"
import { authMiddleware, authRoutes } from "./auth/better-auth"
import { logger } from "./utils/logger"

export const app = new Elysia()
	.use(authRoutes)
	.use(authMiddleware)
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/favicon.ico", Bun.file("./public/favicon.ico"))
	.get("/", react)
	.get("/api/names", ["Jack", "Jill", "Jones"])

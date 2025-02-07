import { Elysia } from "elysia"
import { authMiddleware, authRoutes } from "./auth/better-auth"
import homepage from "./pages/index.html"
import login from "./pages/login.html"
import { logger } from "./utils/logger"

export const app = new Elysia()
	.use(authRoutes)
	.use(authMiddleware)
	.onBeforeHandle(({ path }) => logger.info(path))
	.get("/favicon.ico", Bun.file("./public/favicon.ico"))
	.get("/", homepage)
	.get("/login", login)
	.get("/settings", ({ user }) => user, {
		isAuth: true,
	})

import { Elysia, t } from "elysia"
import { html, Html } from "@elysiajs/html"
import betterAuthView from "./auth/better-auth-view"
import { auth } from "./auth/better-auth"

export const server = new Elysia()
	.use(html())
	.all("/api/auth/*", betterAuthView)
	.get("/", async c => {
		await auth.api.signInAnonymous()
	})

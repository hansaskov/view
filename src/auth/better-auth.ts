import account from "$collections/account"
import session from "$collections/session"
import user from "$collections/user"
import verification from "$collections/verification"
import { db } from "$db/drizzle"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin, openAPI } from "better-auth/plugins"
import Elysia, { error } from "elysia"
import { logger } from "../utils/logger"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			user: user.table,
			account: account.table,
			verification: verification.table,
			session: session.table,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [openAPI(), admin()],
})

export const authMiddleware = new Elysia()
	.macro({
		role: (role: "user" | "admin") => ({
			async resolve({ request }) {
				const session = await auth.api.getSession({ headers: request.headers })

				if (!session) {
					return error("Unauthorized", "Authentication is required")
				}

				switch (role) {
					case "user":
						return {
							user: session.user,
							session: session.session,
						}
					case "admin":
						if (!session.user.role) {
							return error("Unauthorized", "User has no role")
						}

						if (session.user.role !== "admin") {
							return error("Unauthorized", "Admin privilages required")
						}
						return {
							user: session.user,
							session: session.session,
						}
					default:
						logger.error("❌ Auth Middleware Unreachable state reached")
						return
				}
			},
		}),
	})
	.as("plugin")

export const authRoutes = new Elysia({ prefix: "/api/auth/*" })
	.post("/", ({ request }) => auth.handler(request))
	.get("/", ({ request }) => auth.handler(request))
	.use(authMiddleware)
	.get("/", ({ user }) => user.role, { role: "user" })

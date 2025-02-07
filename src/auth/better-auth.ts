import account from "$collections/account"
import session, { type Session } from "$collections/session"
import user, { type User } from "$collections/user"
import verification from "$collections/verification"
import { db } from "$db/drizzle"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin, openAPI } from "better-auth/plugins"
import Elysia, { error } from "elysia"

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
		isAuth: {
			async resolve({ request }) {
				const session = await auth.api.getSession({ headers: request.headers })

				if (!session) {
					return error("Unauthorized", "Authentication is required")
				}

				return {
					user: session.user as User,
					session: session.session as Session,
				}
			},
		},

		isAdmin: {
			async resolve({ request }) {
				const session = await auth.api.getSession({ headers: request.headers })

				if (!session) {
					return error("Unauthorized", "Authentication is required")
				}

				if (session.user.role !== "admin") {
					return error("Unauthorized", "Admin privilages is required")
				}

				return {
					user: session.user as User,
					session: session.session as Session,
				}
			},
		},
	})
	.as("plugin")

export const authRoutes = new Elysia({ prefix: "/api/auth/*" })
	.post("/", ({ request }) => auth.handler(request))
	.get("/", ({ request }) => auth.handler(request))

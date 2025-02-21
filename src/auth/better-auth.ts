import account from "@/collections/account"
import session from "@/collections/session"
import user from "@/collections/user"
import verification from "@/collections/verification"
import { db } from "@/db/drizzle"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin, openAPI } from "better-auth/plugins"
import Elysia from "elysia"

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

export const Auth = new Elysia({ name: "better-auth" }).macro({
	auth: {
		async resolve({ error, request: { headers } }) {
			const session = await auth.api.getSession({ headers })

			if (!session) {
				return error(401)
			}

			return {
				user: session.user,
				session: session.session,
			}
		},
	},

	admin: {
		async resolve({ error, request: { headers } }) {
			const session = await auth.api.getSession({ headers })

			if (!session || session.user.role !== "admin") {
				return error(401)
			}

			return {
				user: session.user,
				session: session.session,
			}
		},
	},
})

export const betterAuthHandler = new Elysia({ prefix: "/api/auth/*" })
	.post("/", ({ request }) => auth.handler(request))
	.get("/", ({ request }) => auth.handler(request))

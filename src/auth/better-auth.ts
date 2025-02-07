import account from "$collections/account"
import session from "$collections/session"
import user from "$collections/user"
import verification from "$collections/verification"
import { db } from "$db/drizzle"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"
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
	plugins: [openAPI()],
})

export const authMiddleware = new Elysia()
	.macro({
		isAuth: {
			async resolve({ request }) {
				const session = await auth.api.getSession({ headers: request.headers })

				if (!session) {
					return error("Method Not Allowed")
				}

				return {
					user: session.user,
					session: session.session,
				}
			},
		},
	})
	.as("plugin")

export const authRoutes = new Elysia({ prefix: "/api/auth/*" })
	.post("/", ({ request }) => auth.handler(request))
	.get("/", ({ request }) => auth.handler(request))

import { db } from "$db/drizzle"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import Elysia, { error } from "elysia"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite", // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true,
	},
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
	.post("/", auth.handler)
	.get("/", auth.handler)

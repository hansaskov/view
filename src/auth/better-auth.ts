import account from "@/collections/account"
import session from "@/collections/session"
import user from "@/collections/user"
import verification from "@/collections/verification"
import { db } from "@/db/drizzle"
import { environment } from "@/utils/environment"
import { logger } from "@/utils/logger"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin, openAPI, organization } from "better-auth/plugins"
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

		async sendResetPassword(data, request) {
			// Send an email to the user with a link to reset their password
			logger.error("EMAIL NOT IMPLEMENTED")
		},
	},

	socialProviders: {
		github: {
			clientId: environment.GITHUB_CLIENT_ID,
			clientSecret: environment.GITHUB_CLIENT_SECRET,
		},
		google: {
			clientId: environment.GOOGLE_CLIENT_ID,
			clientSecret: environment.GOOGLE_CLIENT_SECRET,
		},
		microsoft: {
			clientId: environment.MICROSOFT_CLIENT_ID,
			clientSecret: environment.MICROSOFT_CLIENT_SECRET,
			// Optional
			tenantId: "common",
			requireSelectAccount: true,
		},
	},

	plugins: [openAPI(), admin(), organization()],
})

export const AuthMiddleware = new Elysia({ name: "better-auth" }).macro({
	auth: {
		async resolve({ error, request }) {
			const session = await auth.api.getSession(request)

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
		async resolve({ error, request }) {
			const session = await auth.api.getSession(request)

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

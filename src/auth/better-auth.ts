import account from "@/collections/account"
import session from "@/collections/session"
import user from "@/collections/user"
import verification from "@/collections/verification"
import { db } from "@/db/drizzle"
import { logger } from "@/utils/logger"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin, openAPI } from "better-auth/plugins"
import Elysia from "elysia"

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
if (!GITHUB_CLIENT_ID) throw new Error("❌ GITHUB_CLIENT_ID enviroment missing")

const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
if (!GITHUB_CLIENT_SECRET)
	throw new Error("❌ GITHUB_CLIENT_SECRET enviroment missing")

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
if (!GOOGLE_CLIENT_ID) throw new Error("❌ GOOGLE_CLIENT_ID enviroment missing")

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
if (!GOOGLE_CLIENT_SECRET)
	throw new Error("❌ GOOGLE_CLIENT_SECRET enviroment missing")

const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID
if (!MICROSOFT_CLIENT_ID)
	throw new Error("❌ MICROSOFT_CLIENT_ID enviroment missing")

const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET
if (!MICROSOFT_CLIENT_SECRET)
	throw new Error("❌ MICROSOFT_CLIENT_SECRET enviroment missing")

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
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		},
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		},
		microsoft: {
			clientId: MICROSOFT_CLIENT_ID,
			clientSecret: MICROSOFT_CLIENT_SECRET,
			// Optional
			tenantId: "common",
			requireSelectAccount: true,
		},
	},

	plugins: [openAPI(), admin()],
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

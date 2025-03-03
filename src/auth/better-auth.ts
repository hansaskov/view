import account from "@/collections/account"
import invitation from "@/collections/invitation"
import member from "@/collections/member"
import organization from "@/collections/organization"
import session from "@/collections/session"
import user from "@/collections/user"
import verification from "@/collections/verification"
import { db } from "@/db/drizzle"
import { environment } from "@/utils/environment"
import { logger } from "@/utils/logger"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import {
	admin,
	openAPI,
	organization as organizationPlugin,
} from "better-auth/plugins"
import { memberAc } from "better-auth/plugins/organization/access"
import Elysia from "elysia"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			account: account.table,
			invitation: invitation.table,
			member: member.table,
			organization: organization.table,
			session: session.table,
			user: user.table,
			verification: verification.table,
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

	plugins: [openAPI(), admin(), organizationPlugin()],
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
	organization: {
		async resolve({ error, request }) {
			// First define the promises to handle
			const getSession = auth.api.getSession(request)
			const getPermission = auth.api.hasPermission({
				headers: request.headers,
				body: {
					// We specifically ask if they are a member of an organization
					permission: memberAc.statements,
				},
			})

			// Execute all of the promises
			const [session, permission] = await Promise.all([
				getSession,
				getPermission,
			])

			// Check if that they are authorized to perform this action
			if (!session || !permission.success) {
				return error(401)
			}

			// Return values to context
			return {
				user: session.user,
				session: session.session,
			}
		},
	},
})

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

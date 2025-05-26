import { environment } from "@common/utils/environment"
import { logger } from "@common/utils/logger"
import account from "@server/collections/account"
import invitation from "@server/collections/invitation"
import member from "@server/collections/member"
import organization from "@server/collections/organization"
import session from "@server/collections/session"
import user from "@server/collections/user"
import verification from "@server/collections/verification"
import { db } from "@server/db/drizzle"
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
			logger.warn(`sending fake reset email to ${data.user}`)
			logger.warn(`Click the lick below to reset your password \n ${data.url}`)
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

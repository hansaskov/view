import { memberAc } from "better-auth/plugins/organization/access"
import Elysia from "elysia"
import { auth } from "./better-auth"

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

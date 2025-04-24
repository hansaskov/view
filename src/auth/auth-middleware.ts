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
})

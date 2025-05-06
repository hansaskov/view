import Elysia from "elysia"
import { auth } from "./better-auth"

export const AuthMacro = new Elysia({ name: "better-auth" }).macro({
	auth: {
		async resolve({ status, request, redirect }) {
			const session = await auth.api.getSession(request)

			if (!session) {
				throw redirect("/onboard")
			}

			return {
				user: session.user,
				session: session.session,
			}
		},
	},
})

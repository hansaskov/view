import { Elysia, t } from "elysia"
import { html, Html } from "@elysiajs/html"
import betterAuthView from "./auth/better-auth-view"
import { auth } from "./auth/better-auth"
import { AuthMacro } from "./auth/auth-middleware"

export const server = new Elysia()
	.use(html())
	.all("/api/auth/*", betterAuthView)
	.use(AuthMacro)
	.get("/login", async ({ request, set }) => {
		const { headers, response } = await auth.api.signInAnonymous({
			request,
			returnHeaders: true,
		})

		set.headers["set-cookie"] = headers.getSetCookie()

		return <>Hello world</>
	})
	.get("/onboard", () => {
		return <>Onboard?</>
	})
	.get("/", () => {
		return 
		<Layout>
		
		<Layout/>
	}, { auth: true })

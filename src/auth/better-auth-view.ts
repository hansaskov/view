import type { Context } from "elysia"
import { auth } from "./better-auth"

const betterAuthView = (context: Context) => {
	if (context.request.method === "POST" || context.request.method === "GET") {
		return auth.handler(context.request)
	}
	context.status(405)
}

export default betterAuthView

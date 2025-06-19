import { SignIn } from "@client/components/sign-in"
import { publicRoutes } from "@client/layout/PublicRoutes"
import { createRoute } from "@tanstack/react-router"
import { type } from "arktype"

const searchSchema = type({
	redirectURL: "string?",
})

export const loginRoute = createRoute({
	getParentRoute: () => publicRoutes,
	validateSearch: searchSchema,
	component: Page,
	path: "/login",
})

function Page() {
	return (
		<div className="flex justify-center mt-[10vh] mb-[5vh]">
			<SignIn />
		</div>
	)
}

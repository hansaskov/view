import { SignIn } from "@/components/sign-in"
import { publicRoutes } from "@/layout/PublicRoutes"
import { createRoute, redirect } from "@tanstack/react-router"
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

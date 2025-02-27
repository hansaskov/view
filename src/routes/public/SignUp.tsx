import { SignUp } from "@/components/sign-up"
import { publicRoutes } from "@/layout/PublicRoutes"
import { createRoute } from "@tanstack/react-router"

export const signUpRoute = createRoute({
	getParentRoute: () => publicRoutes,
	component: Page,
	path: "/sign-up",
})

function Page() {
	return (
		<div className="container max-w-6xl mx-auto px-6">
			<div className="flex justify-center mt-[10vh] mb-[5vh]">
				<SignUp />
			</div>
		</div>
	)
}

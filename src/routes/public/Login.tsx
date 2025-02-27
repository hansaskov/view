import { SignIn } from "@/components/sign-in"
import { publicRoutes } from "@/layout/PublicRoutes"
import { createRoute } from "@tanstack/react-router"

export const loginRoute = createRoute({
	getParentRoute: () => publicRoutes,
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

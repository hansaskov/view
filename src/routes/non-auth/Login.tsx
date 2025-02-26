import { SignIn } from "@/components/sign-in"
import { nonAuthRoute } from "@/layout/NonAuthLayout"
import { createRoute } from "@tanstack/react-router"

export const loginRoute = createRoute({
	getParentRoute: () => nonAuthRoute,
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

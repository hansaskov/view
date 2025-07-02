import { publicRoutes } from "@client/layout/PublicRoutes"
import { createRoute } from "@tanstack/react-router"

export const forgotPasswordRoute = createRoute({
	getParentRoute: () => publicRoutes,
	component: Page,
	path: "/forgot-password",
})

function Page() {
	return "Whoops, looks like you've forgotten your password"
}

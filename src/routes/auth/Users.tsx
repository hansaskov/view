import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"

export const usersRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/users",
})

function Page() {
	return <>Users</>
}

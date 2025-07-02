import { protectedRoute } from "@client/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"

export const filesRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/files",
})

function Page() {
	return "Files"
}

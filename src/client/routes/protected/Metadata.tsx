import { protectedRoute } from "@client/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"

export const metadataRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/metadata",
})

function Page() {
	return "Metadata"
}

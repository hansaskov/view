import { protectedRoute } from "@/layout/ProtectedRoutes"
import { createRoute } from "@tanstack/react-router"

export const apiKeysRoute = createRoute({
	getParentRoute: () => protectedRoute,
	component: Page,
	path: "/api-keys",
})

function Page() {
	return <>API Keys</>
}

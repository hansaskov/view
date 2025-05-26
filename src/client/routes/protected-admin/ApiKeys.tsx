import { protectedAdminRoute } from "@client/layout/ProtectedAdminRoutes"
import { createRoute } from "@tanstack/react-router"

export const apiKeysRoute = createRoute({
	getParentRoute: () => protectedAdminRoute,
	component: Page,
	path: "/api-keys",
})

function Page() {
	return <>API Keys</>
}

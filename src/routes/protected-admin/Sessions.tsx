import { protectedAdminRoute } from "@/layout/ProtectedAdminRoutes"
import { createRoute } from "@tanstack/react-router"

export const sessionsRoute = createRoute({
	getParentRoute: () => protectedAdminRoute,
	component: Page,
	path: "/sessions",
})

function Page() {
	return <>Sessions</>
}

import { protectedAdminRoute } from "@/layout/ProtectedAdminRoutes"
import { createRoute } from "@tanstack/react-router"

export const logRoute = createRoute({
	getParentRoute: () => protectedAdminRoute,
	component: Page,
	path: "/log",
})

function Page() {
	return <>Logs</>
}
